import { Link } from 'react-router-dom';
import './AboutPage.css';
export default function AboutPage() {
  return (
    <main className="about">
      <h1>About</h1>
      <p>Author: Artur Khelshtein</p>
      <p>
        Course: {' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
      </p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}