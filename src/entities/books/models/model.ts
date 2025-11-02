/**
 * IBook - Interface for a book
 */
export interface IBook {
    id: string;
    title: string;
    author: string | null;
    pages: number;
    description: string | null;
    ISBN10: string | null;
    ISBN13: string | null;
    coverUrl: string | null;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * IBooks - Interface for a list of books
 */
export interface IBooks {
    books: IBook[];
    totalCount: number;
}

/**
 * IBookCreate - Interface for creating a book
 */
export interface IBookCreate {
    title: string;
    author?: string;
    pages: number;
    description?: string;
    ISBN10?: string;
    ISBN13?: string;
    coverImage?: File;
}

/**
 * IBookUpdate - Interface for updating a book
 */
export interface IBookUpdate {
    title?: string;
    author?: string;
    pages?: number;
    description?: string;
    ISBN10?: string;
    ISBN13?: string;
    coverImage?: File;
}

/**
 * IBookQuery - Interface for querying books
 */
export interface IBookQuery {
    value: string;
    page: number;
    limit: number;
    sort: "createdAt" | "title";
    order: "asc" | "desc";
}
