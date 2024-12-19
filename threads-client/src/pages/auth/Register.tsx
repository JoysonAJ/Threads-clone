import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/helpers/formSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { LoginPageRoute } from "@/routes/route.path";

function Register() {
  // Setting up the form using React Hook Form with Zod validation
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema), // Using Zod resolver for validation
    defaultValues: {
      fullName: "", // Default value for full name
      email: "", // Default value for email
      password: "", // Default value for password
      confirmPassword: "", // Default value for confirm password
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="rounded-lg shadow-md w-96 border-2 border-gray-900 p-4 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup with Email
        </h2>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)} // Handling form submission
            className="space-y-8 flex flex-col"
          >
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the full Name" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation messages */}
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the email" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation messages */}
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the password" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation messages */}
                </FormItem>
              )}
            />
            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation messages */}
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button> {/* Submit button */}
          </form>
        </Form>

        {/* Link to the login page */}
        <div className="text-center py-4">
          Already a user?{" "}
          <Link to={LoginPageRoute.navigateTo} className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );

  // Submit handler for the form
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values); // Logging the form values to the console
  }
}

export default Register;
