import { useForm } from "react-hook-form";
import type { Route } from "./+types/sign-in";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Navigate, redirect, useNavigate } from "react-router";
import { PasswordInput } from "@/components/password-input";
import { useSignIn } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { extractApiError } from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin | Sign In" },
    { name: "description", content: "Welcome to Crediscript Admin Dashboard" },
  ];
}

export type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignIn();

  const handleOnSubmit = (values: SignInFormData) => {
    console.log(values);

    mutate(values, {
      onSuccess: (data) => {
        login(data);
        toast.success(data.message);
        console.log(data);
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      },

      onError: (err: any) => {
        console.log(err);
        toast.error(extractApiError(err));
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="mb-5 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>

                      <Link
                        to="/secret/forgot-password"
                        className="text-sm text-primary underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer disabled:cursor-not-allowed"
                disabled={isPending}
              >
                <div className="flex items-center">
                  {isPending && (
                    <Loader2 className="mr-2 animate-spin h-2 w-2" />
                  )}
                  {isPending ? "Logging In..." : "Login"}
                </div>
              </Button>
            </form>
          </Form>

          <CardFooter>
            <div className="flex items-center justify-center mx-auto mt-5">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/secret/register" className="text-primary underline">
                  Register
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
