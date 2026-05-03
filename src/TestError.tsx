import { Component } from 'react';
import './TestError.css';
import Button from './Button';

type TestErrorProps = Record<string, never>

class TestError extends Component<TestErrorProps> {
  render() {
    return (
      <div className="test-error">
        <Button label='Test Error' />
      </div>
    );
  }
}

export default TestError;
