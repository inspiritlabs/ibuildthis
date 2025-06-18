export interface CreateReplicaReq {
  name: string;
  sampleUrl: string;
}

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
  text: string
): Promise<string> => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ replicaId, text })
  });
  return res.text();
};
