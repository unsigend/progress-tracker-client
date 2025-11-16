import type { BookResponseDto } from "@/lib/api/api";
import type { Book } from "./model";

/**
 * mapToBook - Map a BookResponseDto to a Book
 * @param book - The BookResponseDto to map
 * @returns The mapped Book
 */
export const mapToBook = (book: BookResponseDto): Book => {
    return {
        id: book.id,
        title: book.title,
        author: book.author,
        pages: book.pages,
        description: book.description,
        ISBN10: book.ISBN10,
        ISBN13: book.ISBN13,
        coverUrl: book.coverUrl,
        createdBy: book.createdBy,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
    };
};

/**
 * mapToBookDto - Map a Book to a BookResponseDto
 * @param book - The Book to map
 * @returns The mapped BookResponseDto
 */
export const mapToBookDto = (book: Book): BookResponseDto => {
    return {
        id: book.id,
        title: book.title,
        author: book.author,
        pages: book.pages,
        description: book.description,
        ISBN10: book.ISBN10,
        ISBN13: book.ISBN13,
        coverUrl: book.coverUrl,
        createdBy: book.createdBy,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
    };
};
