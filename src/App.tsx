import { useState, useEffect } from 'react';
import { useFormStore } from "./store/formStore";
import Button from "./components/Button";
import Modal from "./components/Modal";
import UncontrolledForm from "./components/UncontrolledForm";
import HookForm from "./components/HookForm";
import "./App.css";

export default function App() {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [hookFormOpen, setHookFormOpen] = useState(false);
  const submissions = useFormStore((state) => state.submissions);
  const markNotNew = useFormStore((state) => state.markNotNew);

  return (
    <div className="app">
      <h1>React Forms</h1>
      <div className="form-buttons">
        <Button
          label="Uncontrolled Form"
          onClick={() => {
            setUncontrolledOpen(true);
          }}
        />
        <Button
          label="React Hook Form"
          onClick={() => {
            setHookFormOpen(true);
          }}
        />
      </div>

      <h2>Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        <div className="submissions-grid">
          {submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onMarkNotNew={markNotNew}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={uncontrolledOpen}
        onClose={() => {
          setUncontrolledOpen(false);
        }}
        title="Uncontrolled Form"
      >
        <UncontrolledForm
          onClose={() => {
            setUncontrolledOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={hookFormOpen}
        onClose={() => {
          setHookFormOpen(false);
        }}
        title="React Hook Form"
      >
        <HookForm
          onClose={() => {
            setHookFormOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

function SubmissionCard({
  submission,
  onMarkNotNew,
}: {
  submission: import("./types").Submission;
  onMarkNotNew: (id: string) => void;
}) {
  const [isHighlighted, setIsHighlighted] = useState(submission.isNew ?? false);

  useEffect(() => {
    if (!submission.isNew) return;
    const timer = setTimeout(() => {
      onMarkNotNew(submission.id);
      setIsHighlighted(false);
    }, 3000);
    return () => {clearTimeout(timer)};
  }, [submission.id, submission.isNew, onMarkNotNew]);

  return (
    <div
      className={`submission-card ${isHighlighted ? "submission-card--new" : ""}`}
    >
      {submission.image && (
        <img
          src={submission.image}
          alt={`${submission.name}'s avatar`}
          className="submission-card__image"
        />
      )}
      <div className="submission-card__content">
        <h3>{submission.name}</h3>
        <p>Email: {submission.email}</p>
        <p>Age: {submission.age}</p>
        <p>Gender: {submission.gender}</p>
        <p>Country: {submission.country}</p>
      </div>
    </div>
  );
}
