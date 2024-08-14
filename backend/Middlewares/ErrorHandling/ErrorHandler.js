const mongoose = require('mongoose');
const { AppError, BadRequestError, ConflictError } = require('./Errors');

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        if (el.kind === 'required') {
            return `${el.path} is required`;
        }
        return el.message;
    });
    const message = `Validation failed: ${errors.join('. ')}`;
    return new BadRequestError(message);
};

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const message = `${err.keyValue[field]} ${Object.keys(err.keyValue)[0].toLowerCase()} already exists.`;
    return new ConflictError(message);
};

const ErrorHandler = (err, req, res, next) => {
    let error = err;

    if (error instanceof mongoose.Error.ValidationError) error = handleValidationErrorDB(err);
    if (error instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
    if (error.code && error.code === 11000) error = handleDuplicateFieldsDB(err);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: error.status,
            error: error.message,
        });
    }

    console.error('ERROR 💥', error);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};

module.exports = ErrorHandler;
