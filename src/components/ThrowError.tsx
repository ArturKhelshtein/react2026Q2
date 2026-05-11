import { Component } from 'react';

class ThrowError extends Component {
  componentDidMount() {
    throw new Error('Test error');
  }
  render() {
    return null;
  }
}

export default ThrowError;
