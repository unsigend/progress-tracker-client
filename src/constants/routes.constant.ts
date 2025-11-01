// Routes Constants

const LANDING_ROOT = "";
const AUTH_ROOT = `${LANDING_ROOT}/auth`;
const DASHBOARD_ROOT = `${LANDING_ROOT}/dashboard`;

export const ROUTES_CONSTANTS = {
    LANDING() {
        return {
            HOME: (): string => LANDING_ROOT,
            ABOUT: (): string => `${LANDING_ROOT}/about`,
            CONTACT: (): string => `${LANDING_ROOT}/contact`,
        };
    },
    AUTH() {
        return {
            ROOT: (): string => AUTH_ROOT,
            LOGIN: (): string => `${AUTH_ROOT}/login`,
            REGISTER: (): string => `${AUTH_ROOT}/register`,
            RESET_PASSWORD: (): string => `${AUTH_ROOT}/reset-password`,
        };
    },
    DASHBOARD() {
        return {
            HOME: (): string => DASHBOARD_ROOT,
            SETTINGS: (): string => `${DASHBOARD_ROOT}/settings`,
        };
    },
};
