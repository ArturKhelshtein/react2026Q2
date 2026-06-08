import { useState } from "react";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>React Forms</h1>
      <Button
        label="Open Modal"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Test Modal"
      >
        <p>Modal content works!</p>
        <Button
          label="Close"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
