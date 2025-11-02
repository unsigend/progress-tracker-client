// Api Key Factory
import type { IBookQuery } from "@/entities/books/models/model";

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
            LIST: (query: IBookQuery) => {
                return [RESOURCES_KEYS.BOOKS, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.BOOKS, id];
            },
        },
    };
};
