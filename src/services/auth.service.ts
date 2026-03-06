import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { UnathorizedError } from "../errors/UnathorizedError";
import { NotFoundError } from "../errors/NotFoundError";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (email: string, password: string) => {
	const existingUser = await prisma.user.findUnique({
		where: { email }
	});

	if (existingUser) {
		throw new Error("User already exist");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		}
	});

	return (user);
}

export const loginUser = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		throw new UnathorizedError("Invalid credentials");
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new UnathorizedError("Invalid credentials");
	}

	const token = jwt.sign(
		{ userId: user.id, email: user.email, role: user.role },
		process.env.JWT_SECRET as string,
		{ expiresIn: "1h"}
	);
	
	return ({
		token,
		user: {
			id: user.id,
			email: user.email,
			role: user.role
		}
	});
}

export const getMe = async (userId: number) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			role: true,
			createdAt: true,
		}
	});

	if (!user) {
		throw new NotFoundError("User not found");
	}

	return (user);
}