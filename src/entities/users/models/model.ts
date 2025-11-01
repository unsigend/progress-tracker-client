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
 * IUser - Interface for a user
 */
export interface IUser {
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
 * IUserUpdate - Interface for updating a user
 */
export interface IUserUpdate {
    username?: string;
    email?: string;
    password?: string;
    avatarImage?: File;
}
