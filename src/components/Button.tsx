import { type MouseEventHandler } from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, type = 'button', onClick }: ButtonProps) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
