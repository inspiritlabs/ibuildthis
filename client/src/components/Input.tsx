import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const Input: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <input
    className="w-full p-2 bg-transparent border-b border-white focus:outline-none"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

export default Input;
