"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
function getEnv(name) {
    var value = process.env[name];
    if (!value) {
        throw new Error("Environment variable ".concat(name, " is not defined"));
    }
    return value;
}
exports.env = {
    JWT_SECRET: getEnv('JWT_SECRET'),
    DATABASE_URL: getEnv('DATABASE_URL'),
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000',
};
