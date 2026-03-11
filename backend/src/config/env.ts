import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
}

export const env = {
  JWT_SECRET: getEnv('JWT_SECRET'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  PORT: process.env.PORT ?? '3000',
};
