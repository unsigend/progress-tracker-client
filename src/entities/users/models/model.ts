/**
 * UserRole - Constants for user roles
 */
export const UserRole = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

/**
 * UserRoleType - Type for user role values
 */
export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

/**
 * User - Interface for a user
 */
export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl: string | null;
    provider: string[];
    role: UserRoleType;
    createdAt: string;
    updatedAt: string;
}

/**
 * UserUpdate - Interface for updating a user
 */
export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
    avatarImage?: File;
}
