"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var AppError_1 = require("../errors/AppError");
var logger_1 = require("../config/logger");
var errorMiddleware = function (err, _req, res, _next) {
    logger_1.logger.error({ err: err }, 'Unhandled error');
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    res.status(500).json({
        message: 'Internal Server Error',
    });
};
exports.errorMiddleware = errorMiddleware;
