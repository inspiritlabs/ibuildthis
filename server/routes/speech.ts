import { Router } from 'express';
import { speak } from '../eleven';
import { store } from './replicas';

const router = Router();

router.get('/:replicaId', async (req, res) => {
  const { replicaId } = req.params;
  const { text } = req.query as { text?: string };
  if (!text) return res.status(400).end();

  const replica = store.get(replicaId);
  if (!replica) return res.status(404).end();
  try {
    const audio = await speak(replica.voiceId, text);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audio);
  } catch (err) {
    res.status(500).json({ error: 'tts_failed' });
  }
});

export default router;
