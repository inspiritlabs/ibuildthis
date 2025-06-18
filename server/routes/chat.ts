import { Router } from 'express';
import { OpenAI } from 'openai';
import { store } from './replicas';

const router = Router();
const openai = new OpenAI();

router.post('/', async (req, res) => {
  const { replicaId, text } = req.body as { replicaId: string; text: string };
  const replica = store.get(replicaId);
  if (!replica) return res.status(404).end();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
    stream: true
  });

  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) res.write(content);
  }

  res.end();
});

export default router;
