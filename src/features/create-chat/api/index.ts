export const generateImage = async (character: string): Promise<string | undefined> => {
  const url = '/api/proxy/generate';
  const payload = {
    video_description: `${character}, portrait, face`,
    negative_prompt: 'blurry, low quality, distorted faces, poor lighting',
    aspect_ratio: '1:1',
    output_format: 'webp',
    seed: 0,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      return;
    }

    const result = await response.json();

    if (!result?.direct_url) {
      console.error('Image generation failed:', result?.error || 'No URL returned');
      return;
    }

    return result.direct_url;
  } catch (error) {
    console.error('Image generation error:', error);
    return;
  }
};
