// Api Key Factory

const RESOURCES_KEYS = {
    USERS: "users",
    BOOKS: "books",
};

/**
 * Api Key Factory for the application
 */
export const API_KEY_FACTORY = () => {
    return {
        USERS: {
            ALL: () => {
                return [RESOURCES_KEYS.USERS, "all"];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.USERS, id];
            },
            ME: () => {
                return [RESOURCES_KEYS.USERS, "me"];
            },
        },
        BOOKS: {
            ALL: () => {
                return [RESOURCES_KEYS.BOOKS, "all"];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.BOOKS, id];
            },
        },
    };
};
