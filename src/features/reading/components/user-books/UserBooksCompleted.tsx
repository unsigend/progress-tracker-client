import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BookCover } from "@/components/common/BookCover";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useUserBooks } from "@/features/reading/api";

/**
 * UserBooksCompleted - Smart component for displaying completed books
 * Handles its own data fetching
 * @returns UserBooksCompleted component
 */
export const UserBooksCompleted = () => {
    // Fetch completed books
    const { data, isLoading } = useUserBooks({
        field: "status",
        value: "COMPLETED",
        sort: "completedDate",
        order: "desc",
        page: 1,
        limit: 10,
    });

    const completedBooks = data?.userBooks || [];
    if (isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        Completed Books
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    const booksForGrid = completedBooks
        .filter((userBook) => userBook.book !== null)
        .map((userBook) => ({
            id: userBook.id, // Use userBook.id for navigation
            coverUrl: userBook.book!.coverUrl,
            title: userBook.book!.title,
            author: userBook.book!.author,
        }));
    const completedBooksTotalCount = completedBooks.length;
    const completedBooksTotalPages = completedBooks.reduce(
        (sum, userBook) => sum + (userBook.book?.pages || 0),
        0
    );

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                    Completed Books
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {completedBooks.length > 0 ? (
                    <div className="space-y-6">
                        {/* Summary Bar */}
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {completedBooksTotalCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Books Completed
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-border"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {completedBooksTotalPages}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Pages Read
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Library */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Your Library
                                </h3>
                            </div>
                            <div className="grid gap-6 w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-10">
                                {booksForGrid.map((book) => (
                                    <div key={book.id} className="flex justify-center">
                                        <BookCover
                                            image={book.coverUrl || "/placeholder-book.jpg"}
                                            alt={
                                                book.title
                                                    ? `${book.title} by ${
                                                          book.author || "Unknown Author"
                                                      }`
                                                    : "Book cover"
                                            }
                                            to={ROUTES_CONSTANTS.DASHBOARD()
                                                .READING()
                                                .USER_BOOKS()
                                                .DETAIL(book.id)}
                                            className="transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">
                                Your completed reading journey
                            </p>
                            <p className="text-sm">
                                Books will appear here once you finish them
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

