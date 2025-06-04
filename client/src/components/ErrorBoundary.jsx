import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-base-200 rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-error mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-base-content/70 mb-6">
                The application encountered an unexpected error. Please try refreshing the page.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary w-full"
                >
                  Refresh Page
                </button>
                
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="btn btn-outline w-full"
                >
                  Clear Data & Refresh
                </button>
              </div>

              {/* Show error details in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-base-content/60 hover:text-base-content">
                    Show Error Details
                  </summary>
                  <div className="mt-2 p-3 bg-base-300 rounded text-xs font-mono overflow-auto max-h-40">
                    <div className="text-error font-bold mb-2">Error:</div>
                    <div className="mb-3">{this.state.error.toString()}</div>
                    
                    <div className="text-error font-bold mb-2">Stack Trace:</div>
                    <div className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
