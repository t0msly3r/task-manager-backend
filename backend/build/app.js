"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var error_middleware_1 = require("./middlewares/error.middleware");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_1 = require("./config/swagger");
var helmet_1 = require("helmet");
var logger_middleware_1 = require("./middlewares/logger.middleware");
var cors_1 = require("cors");
var node_process_1 = require("node:process");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: node_process_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(logger_middleware_1.httpLogger);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
