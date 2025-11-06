// Routes Constants

const LANDING_ROOT = "/";
const AUTH_ROOT = `${LANDING_ROOT}auth`;
const DASHBOARD_ROOT = `${LANDING_ROOT}dashboard`;

/**
 * ROUTES_CONSTANTS - Constants for the routes
 */
export const ROUTES_CONSTANTS = {
    LANDING() {
        return {
            HOME: (): string => LANDING_ROOT,
            ABOUT: (): string => `${LANDING_ROOT}about`,
            CONTACT: (): string => `${LANDING_ROOT}contact`,
        };
    },
    AUTH() {
        return {
            ROOT: (): string => AUTH_ROOT,
            LOGIN: (): string => `${AUTH_ROOT}/login`,
            REGISTER: (): string => `${AUTH_ROOT}/register`,
            RESET_PASSWORD: (): string => `${AUTH_ROOT}/reset-password`,
            GITHUB_CALLBACK: (): string => `${AUTH_ROOT}/github/callback`,
            GOOGLE_CALLBACK: (): string => `${AUTH_ROOT}/google/callback`,
        };
    },
    DASHBOARD() {
        return {
            HOME: (): string => DASHBOARD_ROOT,
            SETTINGS: (): string => `${DASHBOARD_ROOT}/settings`,
            READING() {
                return {
                    HOME: (): string => `${DASHBOARD_ROOT}/reading`,
                    BOOKS: () => {
                        return {
                            LIST: (): string =>
                                `${DASHBOARD_ROOT}/reading/books`,
                            NEW: (): string =>
                                `${DASHBOARD_ROOT}/reading/books/new`,
                            EDIT: (id?: string): string =>
                                `${DASHBOARD_ROOT}/reading/books/${
                                    id ?? ":id"
                                }/edit`,
                            DETAIL: (id?: string): string =>
                                `${DASHBOARD_ROOT}/reading/books/${
                                    id ?? ":id"
                                }`,
                        };
                    },
                    RECORDINGS() {
                        return {
                            NEW: (): string =>
                                `${DASHBOARD_ROOT}/reading/recordings/new`,
                        };
                    },
                    USER_BOOKS() {
                        return {
                            DETAIL: (id?: string): string =>
                                `${DASHBOARD_ROOT}/reading/user-books/${
                                    id ?? ":id"
                                }`,
                        };
                    },
                };
            },
            COURSES() {
                return {
                    HOME: (): string => `${DASHBOARD_ROOT}/courses`,
                    NEW: (): string => `${DASHBOARD_ROOT}/courses/new`,
                    EDIT: (id?: string): string =>
                        `${DASHBOARD_ROOT}/courses/${id ?? ":id"}/edit`,
                    DETAIL: (id?: string): string =>
                        `${DASHBOARD_ROOT}/courses/${id ?? ":id"}`,
                };
            },
            PROJECTS() {
                return {
                    HOME: (): string => `${DASHBOARD_ROOT}/projects`,
                };
            },
        };
    },
};
