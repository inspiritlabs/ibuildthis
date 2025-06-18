import { Router } from 'express';
import { addVoice } from '../eleven';
import { v4 as uuid } from 'uuid';

type Replica = { replicaId: string; voiceId: string; name: string };
const store = new Map<string, Replica>();

const router = Router();

router.post('/', async (req, res) => {
  const { name, sampleUrl } = req.body as { name: string; sampleUrl: string };
  const voiceId = await addVoice(name, sampleUrl);
  const replicaId = uuid();
  store.set(replicaId, { replicaId, voiceId, name });
  res.json({ replicaId });
});

export { store };
export default router;
