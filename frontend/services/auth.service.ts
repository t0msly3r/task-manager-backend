import { api } from "@/lib/axios";
import Cookies from "js-cookie";

export interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);

  const token = res.data.token;

  Cookies.set("token", token);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logout = () => {
  Cookies.remove("token");
};

export const register = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  const token = res.data.token;

  Cookies.set("token", token);

  return res.data;
};
