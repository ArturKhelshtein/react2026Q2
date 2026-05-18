import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import AppRouter from './router.tsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/react2026Q2">
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);