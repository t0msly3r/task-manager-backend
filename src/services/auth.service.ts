import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";

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
		throw new Error("Invalid credentials");
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new Error("Invalid credentials");
	}

	const token = jwt.sign(
		{ userId: user.id, email: user.email, role: user.role },
		JWT_SECRET,
		{ expiresIn: "1h"}
	);
	
	return (token);
}