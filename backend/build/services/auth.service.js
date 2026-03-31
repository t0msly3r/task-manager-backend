"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const NotFoundError_1 = require("../errors/NotFoundError");
const logger_1 = require("../config/logger");
const env_1 = require("../config/env");
const AppError_1 = require("../errors/AppError");
const JWT_SECRET = env_1.env.JWT_SECRET;
const registerUser = async (email, password) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new AppError_1.AppError('User already exist', 400);
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;
    return safeUser;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new UnauthorizedError_1.UnauthorizedError('Invalid credentials');
    }
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        throw new UnauthorizedError_1.UnauthorizedError('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
    });
    logger_1.logger.info({ userId: user.id }, 'User logged in');
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
const getMe = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new NotFoundError_1.NotFoundError('User not found');
    }
    return user;
};
exports.getMe = getMe;
//# sourceMappingURL=auth.service.js.map