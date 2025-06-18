import React from 'react';

interface Props {
  message: { sender: 'user' | 'assistant'; text: string };
}

const ChatBubble: React.FC<Props> = ({ message }) => (
  <div
    className={`max-w-[60%] p-2 rounded text-white ${
      message.sender === 'user' ? 'ml-auto bg-emerald-600' : 'mr-auto bg-slate-700'
    }`}
  >
    {message.text}
  </div>
);

export default ChatBubble;
