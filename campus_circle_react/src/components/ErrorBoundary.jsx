import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>⚠️ Something went wrong.</h2>
          <p>We're working on fixing it. Please try again later.</p>
          <a href="/home">Go Back Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
