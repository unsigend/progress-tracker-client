// Auth Model

/**
 * ILoginForm - Interface for login form
 * @email - The email of the user
 * @password - The password of the user
 */
export interface ILoginForm {
    email: string;
    password: string;
}

/**
 * IRegisterForm - Interface for register form
 * @username - The username of the user
 * @email - The email of the user
 * @password - The password of the user
 */
export interface IRegisterForm {
    username: string;
    email: string;
    password: string;
}

/**
 * IAccessToken - Interface for access token
 * @accessToken - The access token
 */
export interface IAccessToken {
    accessToken: string;
}

/**
 * IResetToken - Interface for reset token
 * @resetToken - The reset token
 */
export interface IResetToken {
    resetToken: string;
}

/**
 * IVerifyCode - Interface for verify code
 * @code - The code
 * @resetToken - The reset token
 */
export interface IVerifyCode {
    code: string;
    resetToken: string;
}

/**
 * IResetPassword - Interface for reset password
 * @newPassword - The new password
 * @code - The code
 * @resetToken - The reset token
 */
export interface IResetPassword {
    newPassword: string;
    code: string;
    resetToken: string;
}
