import { Component } from 'react';
import './Button.css';

type ButtonProps = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

class Button extends Component<ButtonProps> {
  render() {
    const { label, onClick } = this.props;

    return (
      <button className="button" type="button" onClick={onClick}>
        {label}
      </button>
    );
  }
}

export default Button;
