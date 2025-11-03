import type { IBook } from "@/entities/reading/books/models/model";

/**
 * UserBookStatusType - Type for the status of a user book
 */
export type UserBookStatusType = "IN_PROGRESS" | "COMPLETED";

/**
 * IUserBook - Interface for a user book
 */
export interface IUserBook {
    id: string;
    bookId: string;
    status: UserBookStatusType;
    currentPage: number;
    startDate: string | null;
    completedDate: string | null;
    totalMinutes: number;
    totalDays: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * IUserBooks - Interface for a list of user books
 */
export interface IUserBooks {
    userBooks: IUserBook[];
    totalCount: number;
}

/**
 * IUserBookCreate - Interface for creating a user book
 */
export interface IUserBookCreate {
    bookId: string;
}

/**
 * IUserBookQuery - Interface for querying user books
 */
export interface IUserBookQuery {
    field: string;
    value: string;
    sort: "completedDate" | "startDate" | "createdAt" | "updatedAt";
    order: "asc" | "desc";
    page: number;
    limit: number;
}

/**
 * IUserBookWithBook - Interface for a user book with a book
 */
export interface IUserBookWithBook extends IUserBook {
    book: IBook | null;
}

/**
 * IUserBooksWithBook - Interface for a list of user books with a book
 */
export interface IUserBooksWithBook {
    userBooks: IUserBookWithBook[];
    totalCount: number;
}
