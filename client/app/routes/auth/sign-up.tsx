import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Route } from "./+types/sign-up";
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
import { Link } from "react-router";
import { signUpSchema } from "@/lib/schema";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/password-input";
import { useSignUp } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { extractApiError } from "@/lib/axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin | Sign Up" },
    { name: "description", content: "Welcome to Crediscript Admin Dashboard" },
  ];
}

export type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUp();

  const handleOnSubmit = (values: SignUpFormData) => {
    console.log(values);

    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        console.log(data);
      },

      onError: (err: any) => {
        const errMsg = err.response?.data?.message || "An error occurred";
        console.log(err);
        toast.error(extractApiError(err));
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="mb-5 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Create an admin account to continue
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                  {isPending ? "Creating Account..." : "Create Account"}
                </div>
              </Button>
            </form>
          </Form>

          <CardFooter>
            <div className="flex items-center justify-center mx-auto mt-5">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link to="/secret/login" className="text-primary underline">
                  Login
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
