import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { createReplica } from '@client/lib/api';
import Button from '@client/components/Button';
import Input from '@client/components/Input';

const CreateReplica: React.FC = () => {
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [sampleUrl, setSampleUrl] = useState('');
  const mutation = useMutation({
    mutationFn: () => createReplica({ name, sampleUrl }),
    onSuccess: ({ replicaId }) => navigate(`/chat/${replicaId}`)
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[40rem] bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur">
        <Input value={name} onChange={setName} placeholder="Name" />
        <Input value={sampleUrl} onChange={setSampleUrl} placeholder="Sample URL" />
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateReplica;
