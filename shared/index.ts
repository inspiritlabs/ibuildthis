import { z } from 'zod';

export const CreateReplicaSchema = z.object({
  name: z.string(),
  sampleUrl: z.string().url()
});

export type CreateReplica = z.infer<typeof CreateReplicaSchema>;
