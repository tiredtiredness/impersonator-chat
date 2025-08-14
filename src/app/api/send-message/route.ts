// app/api/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSystemPrompt } from '@/shared/lib/utils';

export async function POST(req: NextRequest) {
  const { to, message, history } = await req.json();

  const apiKey = process.env.API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const model = process.env.NEXT_PUBLIC_AI_MODEL;

  if (!apiKey || !apiUrl || !model) {
    return new NextResponse('Missing environment variables', { status: 500 });
  }

  const messages = [
    {
      role: 'system',
      content: getSystemPrompt(to),
    },
    ...history,
    {
      role: 'user',
      content: message,
    },
  ];

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const sendChunk = (data: string) => {
    writer.write(encoder.encode(`data: ${data}\n\n`));
  };

  const closeStream = () => {
    writer.write(encoder.encode('data: [DONE]\n\n'));
    writer.close();
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  })
    .then((response) => {
      console.log(response);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        sendChunk(JSON.stringify({ type: 'error', content: 'No reader' }));
        closeStream();
        return;
      }

      function read() {
        reader?.read().then(({ done, value }) => {
          if (done) {
            closeStream();
            return;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ') && !line.includes('[DONE]')) {
              const data = line.slice(6);
              if (data.trim() === '') return;

              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content || '';
                if (content) {
                  sendChunk(JSON.stringify({ type: 'content', content }));
                }
              } catch (e) {
                console.error(e);
              }
            }
          }

          read();
        }).catch((err) => {
          sendChunk(JSON.stringify({ type: 'error', content: err.message }));
          closeStream();
        });
      }

      read();
    })
    .catch((err) => {
      sendChunk(JSON.stringify({ type: 'error', content: err.message }));
      closeStream();
    });

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}