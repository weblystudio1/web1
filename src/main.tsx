import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  props: Readonly<ErrorBoundaryProps>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          id="error-boundary-fallback"
          className="min-h-screen bg-[#07111F] text-[#F7FAFC] flex flex-col items-center justify-center p-6 text-center"
          dir="rtl"
        >
          <div className="max-w-md bg-[#0D1B2A] border border-[#1E334D] rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-3 text-[#00D2B4]">
              התרחשה תקלה זמנית בטעינת האתר
            </h2>
            <p className="text-sm text-[#CBD5E1] mb-6 leading-relaxed">
              העמוד נתקל בשגיאה לא צפויה. אנא נסו לרענן את הדף.
            </p>
            <button
              id="error-retry-btn"
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#00D2B4] text-[#04171E] font-bold rounded-lg hover:bg-[#00D2B4]/90 transition-colors"
            >
              רענון הדף
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
