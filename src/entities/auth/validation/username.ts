import { z } from "zod";

/**
 * MIN_USERNAME_LENGTH - Minimum username length requirement
 */
const MIN_USERNAME_LENGTH = 3;

/**
 * MAX_USERNAME_LENGTH - Maximum username length requirement
 */
const MAX_USERNAME_LENGTH = 32;

/**
 * usernameSchema - Zod schema for username validation
 * Validates username length between 3 and 32 characters
 */
export const usernameSchema = z
    .string()
    .min(
        MIN_USERNAME_LENGTH,
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long`
    )
    .max(
        MAX_USERNAME_LENGTH,
        `Username must not exceed ${MAX_USERNAME_LENGTH} characters`
    );

/**
 * isValidUsernameFormat - Validates if a username string meets the length requirements
 * @param username - The username string to validate
 * @returns True if the username format is valid, false otherwise
 */
export const isValidUsernameFormat = (username: string): boolean => {
    try {
        usernameSchema.parse(username);
        return true;
    } catch {
        return false;
    }
};

/**
 * validateUsername - Validates username and returns result with optional error message
 * @param username - The username string to validate
 * @returns Object with isValid boolean and optional error message
 */
export const validateUsername = (
    username: string
): { isValid: boolean; error?: string } => {
    const result = usernameSchema.safeParse(username);
    if (result.success) {
        return { isValid: true };
    }
    const firstError = result.error.issues[0];
    return {
        isValid: false,
        error: firstError?.message || "Invalid username format",
    };
};
