export interface CreateReplicaReq {
  name: string;
  sampleUrl: string;
}

import { stream } from './stream';

export interface CreateReplicaRes {
  replicaId: string;
}

export const createReplica = async (
  data: CreateReplicaReq
): Promise<CreateReplicaRes> => {
  const res = await fetch('/api/replicas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const sendMessage = async (
  replicaId: string,
  text: string,
  onToken: (t: string) => void
): Promise<void> => {
  await stream('/api/chat', { replicaId, text }, onToken);
};

export const fetchSpeech = async (
  replicaId: string,
  text: string
): Promise<Blob> => {
  const res = await fetch(
    `/api/speech/${replicaId}?text=${encodeURIComponent(text)}`
  );
  return res.blob();
};
