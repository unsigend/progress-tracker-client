import type { Book } from "@/features/reading/api/books/models/model";

/**
 * UserBookStatusType - Type for the status of a user book
 */
export type UserBookStatusType = "IN_PROGRESS" | "COMPLETED";

/**
 * UserBook - Interface for a user book
 */
export interface UserBook {
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
 * UserBooks - Interface for a list of user books
 */
export interface UserBooks {
    userBooks: UserBook[];
    totalCount: number;
}

/**
 * UserBookCreate - Interface for creating a user book
 */
export interface UserBookCreate {
    bookId: string;
}

/**
 * UserBookQuery - Interface for querying user books
 */
export interface UserBookQuery {
    field: string;
    value: string;
    sort: "completedDate" | "startDate" | "createdAt" | "updatedAt";
    order: "asc" | "desc";
    page: number;
    limit: number;
}

/**
 * UserBookWithBook - Interface for a user book with a book
 */
export interface UserBookWithBook extends UserBook {
    book: Book | null;
}

/**
 * UserBooksWithBook - Interface for a list of user books with a book
 */
export interface UserBooksWithBook {
    userBooks: UserBookWithBook[];
    totalCount: number;
}
