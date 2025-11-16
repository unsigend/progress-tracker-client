/**
 * Mapper for user books
 */
import { mapToBook } from "@/features/reading/api/books/models/mapper";
import type { UserBooksWithBook, UserBookWithBook } from "./model";
import type { UserBookResponseDto } from "@/lib/api/api";

/**
 * mapToUserBook - Map a UserBookResponseDto to a UserBookWithBook
 * @param userBook - The UserBookResponseDto to map
 * @returns The mapped UserBookWithBook
 */
export const mapToUserBook = (
    userBook: UserBookResponseDto
): UserBookWithBook => {
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
 * mapToUserBooks - Map a UserBooksResponseDto to UserBooksWithBook
 * @param userBooksResponse - The UserBooksResponseDto to map
 * @returns The mapped UserBooksWithBook
 */
export const mapToUserBooks = (userBooksResponse: {
    userBooks: UserBookResponseDto[];
    totalCount: number;
}): UserBooksWithBook => {
    return {
        userBooks: userBooksResponse.userBooks.map(mapToUserBook),
        totalCount: userBooksResponse.totalCount,
    };
};
