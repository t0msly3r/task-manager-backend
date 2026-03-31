"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const task_routes_1 = __importDefault(require("./task.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const registerRoutes = (app) => {
    app.use('/tasks', task_routes_1.default);
    app.use('/auth', auth_routes_1.default);
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map