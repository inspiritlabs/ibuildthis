import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { sendMessage, fetchSpeech } from '@client/lib/api';
import ChatBubble from '@client/components/ChatBubble';
import Input from '@client/components/Input';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const Chat: React.FC = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<Message | null>(null);
  const [text, setText] = useState('');
  const mutation = useMutation({
    mutationFn: (prompt: string) =>
      sendMessage(id!, prompt, (token) => {
        setMessages((m) => {
          const last = m[m.length - 1];
          if (last && last.sender === 'assistant') {
            last.text += token;
            lastMessageRef.current = last;
            return [...m.slice(0, -1), last];
          }
          const msg = { sender: 'assistant', text: token } as Message;
          lastMessageRef.current = msg;
          return [...m, msg];
        });
      }),
    onSuccess: async () => {
      const last = lastMessageRef.current;
      if (last && last.sender === 'assistant') {
        const blob = await fetchSpeech(id!, last.text);
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }
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
