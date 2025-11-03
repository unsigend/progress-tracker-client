// Api Key Factory
import type { IBookQuery } from "@/entities/reading/books/models/model";
import type { IUserBookQuery } from "@/entities/reading/user-books/model/model";

const RESOURCES_KEYS = {
    USERS: "users",
    BOOKS: "books",
    USER_BOOKS: "user-books",
    RECORDINGS: "recordings",
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
        USER_BOOKS: {
            LIST: (query: IUserBookQuery) => {
                return [RESOURCES_KEYS.USER_BOOKS, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.USER_BOOKS, id];
            },
        },
        RECORDINGS: {
            LIST: (userBookId: string) => {
                return [RESOURCES_KEYS.RECORDINGS, userBookId];
            },
        },
    };
};
