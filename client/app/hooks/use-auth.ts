import { postData } from "@/lib/axios";
import type { SignInFormData } from "@/routes/auth/sign-in";
import type { SignUpFormData } from "@/routes/auth/sign-up";
import type { AuthResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) =>
      postData<AuthResponse>("/auth/register", data),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: SignInFormData) =>
      postData<AuthResponse>("/auth/login", data),
  });
};
