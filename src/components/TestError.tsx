import { type MouseEvent } from 'react';
import './TestError.css';
import Button from './Button';

interface TestErrorProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function TestError({ onClick }: TestErrorProps) {
  return (
    <div className="test-error">
      <Button label="Test Error" onClick={onClick} />
    </div>
  );
}

export default TestError;
