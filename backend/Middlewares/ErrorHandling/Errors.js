class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message || 'Not Found', 400);
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message || 'Conflict', 409);
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message || 'Bad Request', 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message || "Invalid username or password", 401);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ConflictError,
    BadRequestError,
    UnauthorizedError
};
