import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/helpers/formSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { registerRoute } from "@/routes/route.path";
import { useLoginMutation } from "@/redux/api/service.api";
import { useEffect } from "react";

function Login() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [logInUser, logInUserStatus] = useLoginMutation();
  const { isSuccess, data } = logInUserStatus;

  useEffect(() => {
    console.log("Result", data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="rounded-lg shadow-md  w-96 border-2 border-gray-900 p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the email" {...field} />
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
                    <Input placeholder="Enter the password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </Form>

        <div className="text-center py-4">
          New to our platform?{" "}
          <Link to={registerRoute.navigateTo} className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const { email, password } = values;
      await logInUser({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors (e.g., display error messages)
        console.error("Validation errors:", error.errors);
        // You can access error.errors to display specific error messages
        // Example:
        error.errors.forEach((err) => {
          console.log(`${err.path.join(".")}: ${err.message}`);
        });
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
    }
  }
}

export default Login;
