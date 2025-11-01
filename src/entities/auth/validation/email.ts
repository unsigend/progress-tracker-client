import { z } from "zod";

/**
 * emailSchema - Zod schema for email validation
 */
export const emailSchema = z.string().email("Invalid email format");

/**
 * isValidEmailFormat - Validates if an email string has a valid format using Zod
 * @param email - The email string to validate
 * @returns True if the email format is valid, false otherwise
 */
export const isValidEmailFormat = (email: string): boolean => {
    try {
        emailSchema.parse(email);
        return true;
    } catch {
        return false;
    }
};

/**
 * validateEmail - Validates email and returns result with optional error message
 * @param email - The email string to validate
 * @returns Object with isValid boolean and optional error message
 */
export const validateEmail = (
    email: string
): { isValid: boolean; error?: string } => {
    const result = emailSchema.safeParse(email);
    if (result.success) {
        return { isValid: true };
    }
    const firstError = result.error.issues[0];
    return {
        isValid: false,
        error: firstError?.message || "Invalid email format",
    };
};
