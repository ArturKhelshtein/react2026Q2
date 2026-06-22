import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import AppRouter from './legacy-router.tsx';
import QueryProvider from './providers/QueryProvider.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename="/react2026Q2">
      <QueryProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);