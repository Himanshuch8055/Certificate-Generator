import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Error boundary for development
if (process.env.NODE_ENV === 'development') {
  const { ErrorBoundary } = require('react-error-boundary');
  
  function ErrorFallback({error}) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Something went wrong:</h1>
          <pre className="text-red-600 bg-red-100 p-4 rounded-lg overflow-auto max-w-lg">
            {error.message}
          </pre>
        </div>
      </div>
    );
  }

  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 