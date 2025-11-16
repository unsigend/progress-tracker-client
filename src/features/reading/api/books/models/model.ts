/**
 * Book - Interface for a book
 */
export interface Book {
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
 * Books - Interface for a list of books
 */
export interface Books {
    books: Book[];
    totalCount: number;
}

/**
 * BookCreate - Interface for creating a book
 */
export interface BookCreate {
    title: string;
    author?: string;
    pages: number;
    description?: string;
    ISBN10?: string;
    ISBN13?: string;
    coverImage?: File;
}

/**
 * BookUpdate - Interface for updating a book
 */
export interface BookUpdate {
    title?: string;
    author?: string;
    pages?: number;
    description?: string;
    ISBN10?: string;
    ISBN13?: string;
    coverImage?: File;
}

/**
 * BookQuery - Interface for querying books
 */
export interface BookQuery {
    value: string;
    page: number;
    limit: number;
    sort: "createdAt" | "title";
    order: "asc" | "desc";
}
