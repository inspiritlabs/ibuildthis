import { ElevenLabsClient } from '@elevenlabs/client';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_API_KEY!,
  projectId: process.env.ELEVEN_PROJECT_ID!
});

export const addVoice = async (name: string, sampleUrl: string): Promise<string> => {
  const res = await client.voices.add({ name, samples: [sampleUrl] });
  return res.voice_id;
};
