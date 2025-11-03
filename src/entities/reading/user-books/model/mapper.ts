// Mapper for user books

import { mapToBook } from "@/entities/reading/books/models/mapper";
import type { IUserBooksWithBook, IUserBookWithBook } from "./model";
import type { UserBookResponseDto } from "@/lib/api/api";

/**
 * mapToUserBook - Map a UserBookResponseDto to an IUserBookWithBook
 * @param userBook - The UserBookResponseDto to map
 * @returns The mapped IUserBookWithBook
 */
export const mapToUserBook = (
    userBook: UserBookResponseDto
): IUserBookWithBook => {
    return {
        id: userBook.id,
        bookId: userBook.bookId,
        status: userBook.status,
        currentPage: userBook.currentPage,
        startDate: userBook.startDate,
        completedDate: userBook.completedDate,
        totalMinutes: userBook.totalMinutes,
        totalDays: userBook.totalDays,
        createdAt: userBook.createdAt,
        updatedAt: userBook.updatedAt,
        book: userBook.book ? mapToBook(userBook.book) : null,
    };
};

/**
 * mapToUserBooks - Map a UserBooksResponseDto to IUserBooksWithBook
 * @param userBooksResponse - The UserBooksResponseDto to map
 * @returns The mapped IUserBooksWithBook
 */
export const mapToUserBooks = (userBooksResponse: {
    userBooks: UserBookResponseDto[];
    totalCount: number;
}): IUserBooksWithBook => {
    return {
        userBooks: userBooksResponse.userBooks.map(mapToUserBook),
        totalCount: userBooksResponse.totalCount,
    };
};
