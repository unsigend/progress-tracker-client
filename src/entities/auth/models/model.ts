/**
 * Auth Model
 */

/**
 * LoginFormData - Interface for login form data
 * @email - The email of the user
 * @password - The password of the user
 */
export interface LoginFormData {
    email: string;
    password: string;
}

/**
 * RegisterFormData - Interface for register form data
 * @username - The username of the user
 * @email - The email of the user
 * @password - The password of the user
 */
export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
}

/**
 * AccessToken - Interface for access token
 * @accessToken - The access token
 */
export interface AccessToken {
    accessToken: string;
}

/**
 * ResetToken - Interface for reset token
 * @resetToken - The reset token
 */
export interface ResetToken {
    resetToken: string;
}

/**
 * VerifyCode - Interface for verify code
 * @code - The code
 * @resetToken - The reset token
 */
export interface VerifyCode {
    code: string;
    resetToken: string;
}

/**
 * ResetPassword - Interface for reset password
 * @newPassword - The new password
 * @code - The code
 * @resetToken - The reset token
 */
export interface ResetPassword {
    newPassword: string;
    code: string;
    resetToken: string;
}
