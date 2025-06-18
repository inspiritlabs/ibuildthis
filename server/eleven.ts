import { ElevenLabsClient } from '@elevenlabs/client';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_API_KEY!,
  projectId: process.env.ELEVEN_PROJECT_ID!
});

export const addVoice = async (name: string, sampleUrl: string): Promise<string> => {
  const res = await client.voices.add({ name, samples: [sampleUrl] });
  return res.voice_id;
};

export const speak = async (voiceId: string, text: string): Promise<Buffer> => {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVEN_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    }
  );

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
};
