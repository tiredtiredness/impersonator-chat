"use server";

import {getSystemPrompt} from "@/shared/lib/utils";

export async function send(to: string, message: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.API_KEY;
  const model = process.env.NEXT_PUBLIC_AI_MODEL;

  if (!apiUrl) {
    return;
  }
  try {
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: getSystemPrompt(to),
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });
    const res = await resp.json();
    return res?.choices?.[0]?.message.content;
  } catch (error) {
    console.error(error);
  }
}
