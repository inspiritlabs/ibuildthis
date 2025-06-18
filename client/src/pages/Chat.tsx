import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { sendMessage } from '@client/lib/api';
import ChatBubble from '@client/components/ChatBubble';
import Input from '@client/components/Input';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const Chat: React.FC = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (prompt: string) => sendMessage(id!, prompt),
    onSuccess: (res) => {
      setMessages((m) => [...m, { sender: 'assistant', text: res }]);
    }
  });

  const handleSend = () => {
    setMessages((m) => [...m, { sender: 'user', text }]);
    setText('');
    mutation.mutate(text);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 text-center text-white bg-black">Replica Chat</header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <ChatBubble key={i} message={m} />
        ))}
      </div>
      <div className="p-4 flex gap-2">
        <Input value={text} onChange={setText} placeholder="Say something" />
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
          disabled={mutation.isPending}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
