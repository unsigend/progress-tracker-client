import { z } from "zod";

/**
 * MIN_PASSWORD_LENGTH - Minimum password length requirement
 */
const MIN_PASSWORD_LENGTH = 8;

/**
 * MAX_PASSWORD_LENGTH - Maximum password length requirement
 */
const MAX_PASSWORD_LENGTH = 128;

/**
 * passwordSchema - Zod schema for password validation
 * Validates password length between 8 and 128 characters
 */
export const passwordSchema = z
    .string()
    .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    )
    .max(
        MAX_PASSWORD_LENGTH,
        `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`
    );

/**
 * isValidPasswordFormat - Validates if a password string meets the length requirements
 * @param password - The password string to validate
 * @returns True if the password format is valid, false otherwise
 */
export const isValidPasswordFormat = (password: string): boolean => {
    try {
        passwordSchema.parse(password);
        return true;
    } catch {
        return false;
    }
};

/**
 * validatePassword - Validates password and returns result with optional error message
 * @param password - The password string to validate
 * @returns Object with isValid boolean and optional error message
 */
export const validatePassword = (
    password: string
): { isValid: boolean; error?: string } => {
    const result = passwordSchema.safeParse(password);
    if (result.success) {
        return { isValid: true };
    }
    const firstError = result.error.issues[0];
    return {
        isValid: false,
        error: firstError?.message || "Invalid password format",
    };
};
