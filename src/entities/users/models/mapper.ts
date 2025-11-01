import type { UserResponseDto } from "@/lib/api/api";
import type { IUser, UserRoleType } from "./model";

/**
 * mapToUser - Map a UserResponseDto to an IUser
 * @param user - The UserResponseDto to map
 * @returns The mapped IUser
 */
export const mapToUser = (user: UserResponseDto): IUser => {
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
 * mapToUserResponseDto - Map an IUser to a UserResponseDto
 * @param user - The IUser to map
 * @returns The mapped UserResponseDto
 */
export const mapToUserResponseDto = (user: IUser): UserResponseDto => {
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
