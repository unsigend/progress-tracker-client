import type { BookResponseDto } from "@/lib/api/api";
import type { IBook } from "./model";

/**
 * mapToBook - Map a BookResponseDto to an IBook
 * @param book - The BookResponseDto to map
 * @returns The mapped IBook
 */
export const mapToBook = (book: BookResponseDto): IBook => {
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
 * mapToBookResponseDto - Map an IBook to a BookResponseDto
 * @param book - The IBook to map
 * @returns The mapped BookResponseDto
 */
export const mapToBookResponseDto = (book: IBook): BookResponseDto => {
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
