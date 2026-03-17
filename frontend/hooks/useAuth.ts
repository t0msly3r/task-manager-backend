import { useMutation } from "@tanstack/react-query";
import * as authService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = () => {
    return useMutation({
        mutationFn: authService.login,
    });
}

export const useRegister = () => {
    return useMutation({
        mutationFn: authService.register,
    })
}

export const useAuth = () => {
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["me"],
        queryFn: authService.getMe,
        retry: false,
        enabled: !!token,
    })

}

export const useLogout = () => {
  return () => {
    authService.logout();
  };
};