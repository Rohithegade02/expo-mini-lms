// Custom error classes
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

export class APIError extends Error {
    statusCode: number;
    errors?: Array<{ field: string; message: string }>;

    constructor(message: string, statusCode: number, errors?: Array<{ field: string; message: string }>) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export class ValidationError extends Error {
    field: string;

    constructor(message: string, field: string) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

// Error handler utility
export class ErrorHandler {
    /**
     * Normalize errors to user-friendly messages
     */
    static normalize(error: unknown): string {
        if (error instanceof NetworkError) {
            return 'Network error. Please check your internet connection.';
        }

        if (error instanceof AuthError) {
            return error.message || 'Authentication failed. Please try again.';
        }

        if (error instanceof APIError) {
            return error.message || 'Something went wrong. Please try again.';
        }

        if (error instanceof ValidationError) {
            return error.message;
        }

        if (error instanceof Error) {
            return error.message;
        }

        return 'An unexpected error occurred. Please try again.';
    }

    /**
     * Check if error is a network error
     */
    static isNetworkError(error: unknown): boolean {
        return error instanceof NetworkError ||
            (error instanceof Error && error.message.toLowerCase().includes('network'));
    }

    /**
     * Check if error is an auth error
     */
    static isAuthError(error: unknown): boolean {
        return error instanceof AuthError ||
            (error instanceof APIError && (error.statusCode === 401 || error.statusCode === 403));
    }

    /**
     * Map HTTP status codes to user messages
     */
    static getMessageForStatusCode(statusCode: number): string {
        const messages: Record<number, string> = {
            400: 'Invalid request. Please check your input.',
            401: 'You are not authorized. Please log in.',
            403: 'You do not have permission to perform this action.',
            404: 'The requested resource was not found.',
            408: 'Request timeout. Please try again.',
            429: 'Too many requests. Please slow down.',
            500: 'Server error. Please try again later.',
            502: 'Bad gateway. Please try again later.',
            503: 'Service unavailable. Please try again later.',
        };

        return messages[statusCode] || 'Something went wrong. Please try again.';
    }
}
