import React, {Component, ReactNode} from "react";
import './ErrorBoundary.scss';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by error boundary: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-boundary-error">Something went wrong. Please try again later.</div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;