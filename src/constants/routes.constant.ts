// Routes Constants

const LANDING_BASE = "/";
const AUTH_BASE = "/auth/";

export const ROUTES_CONSTANTS = () => {
    return {
        LANDING() {
            return {
                HOME(): string {
                    return `${LANDING_BASE}`;
                },
                ABOUT(): string {
                    return `${LANDING_BASE}about`;
                },
                CONTACT(): string {
                    return `${LANDING_BASE}contact`;
                },
            };
        },
        AUTH() {
            return {
                LOGIN(): string {
                    return `${AUTH_BASE}login`;
                },
                SIGNUP(): string {
                    return `${AUTH_BASE}signup`;
                },
            };
        },
    };
};
