import { Component } from 'react';

class ThrowError extends Component {
  render() {
    throw new Error('Test error');
  }
}

export default ThrowError;
