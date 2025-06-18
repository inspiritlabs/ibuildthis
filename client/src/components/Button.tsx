import React from 'react';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ onClick, children, disabled }) => (
  <button
    type="button"
    className="mt-4 w-full bg-emerald-500 text-white py-2 rounded"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
