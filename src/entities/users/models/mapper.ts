import type { UserResponseDto } from "@/lib/api/api";
import type { User, UserRoleType } from "./model";

/**
 * mapToUser - Map a UserResponseDto to an User
 * @param user - The UserResponseDto to map
 * @returns The mapped User
 */
export const mapToUser = (user: UserResponseDto): User => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        provider: user.provider,
        role: user.role as UserRoleType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

/**
 * mapToUserResponseDto - Map an User to a UserResponseDto
 * @param user - The User to map
 * @returns The mapped UserResponseDto
 */
export const mapToUserResponseDto = (user: User): UserResponseDto => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        provider: user.provider,
        role: user.role as UserRoleType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
