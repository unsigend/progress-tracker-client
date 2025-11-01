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
