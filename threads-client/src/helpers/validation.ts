import * as z from "zod";

// Schema for validating a full name
export const fullNameSchema = z.string({
  required_error: "Name is required", // Error message if the name is not provided
  invalid_type_error: "Name must be a string", // Error message if the name is not a string
});

// Schema for validating an email address
export const emailSchema = z.string().email({ message: "Invalid email address" }); // Validates that the string is a valid email format

// Schema for validating a password
export const passwordSchema = z
  .string()
  .min(8, { message: "Password is too short" }) // Ensures the password is at least 8 characters long
  .max(20, { message: "Password is too long" }); // Ensures the password does not exceed 20 characters

// Schema for confirming a password
export const confirmPasswordSchema = z.string(); // Validates that the confirmation password is a string (additional checks can be added later)