import { z } from "zod"; // Importing the Zod library for schema validation
import {
  fullNameSchema,
  confirmPasswordSchema,
  passwordSchema,
  emailSchema
} from "@/helpers/validation"; // Importing validation schemas from the helpers/validation module

// Schema for validating the registration form
export const registerFormSchema = z
  .object({
    fullName: fullNameSchema, // Validates the full name using the fullNameSchema
    email: emailSchema, // Validates the email using the emailSchema
    password: passwordSchema, // Validates the password using the passwordSchema
    confirmPassword: confirmPasswordSchema, // Validates the confirmation password using the confirmPasswordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", // Error message if passwords do not match
    path: ["confirmPassword"], // Specifies the path of the error to be associated with the confirmPassword field
  });

// Schema for validating the login form
export const loginFormSchema = z.object({
  email: emailSchema, // Validates the email using the emailSchema
  password: passwordSchema, // Validates the password using the passwordSchema
});