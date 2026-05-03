import { Component } from 'react';
import './Button.css';

type ButtonProps = Record<string, never>;

class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className="button" type="button">
        Search
      </button>
    );
  }
}

export default Button;
