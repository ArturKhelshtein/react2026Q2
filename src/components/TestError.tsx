import { Component, type MouseEvent } from 'react';
import './TestError.css';
import Button from './Button';

interface TestErrorProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

class TestError extends Component<TestErrorProps> {
  render() {
    const { onClick } = this.props;

    return (
      <div className="test-error">
        <Button label="Test Error" onClick={onClick} />
      </div>
    );
  }
}

export default TestError;
