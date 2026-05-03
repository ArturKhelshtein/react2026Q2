import { Component, type MouseEventHandler } from 'react';
import './Button.css';

type ButtonProps = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

class Button extends Component<ButtonProps> {
  render() {
    const { label, type = 'button', onClick } = this.props;

    return (
      <button className="button" type={type} onClick={onClick}>
        {label}
      </button>
    );
  }
}

export default Button;
