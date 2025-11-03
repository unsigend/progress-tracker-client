import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BookGrid } from "@/features/reading/components/books/BookGrid";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IUserBookWithBook } from "@/entities/reading/user-books/model/model";

/**
 * CompletedSectionProps - Interface for CompletedSection component props
 */
interface CompletedSectionProps {
    completedBooks: IUserBookWithBook[];
    isLoading: boolean;
}

/**
 * CompletedSection - Pure UI component for displaying completed books
 * @param props - The props for the CompletedSection component
 * @param props.completedBooks - Array of completed books
 * @param props.isLoading - Whether the data is loading
 * @returns CompletedSection component
 */
export const CompletedSection = ({
    completedBooks,
    isLoading,
}: CompletedSectionProps) => {
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
                            <BookGrid
                                books={booksForGrid}
                                to={(id) =>
                                    ROUTES_CONSTANTS.DASHBOARD()
                                        .READING()
                                        .USER_BOOKS()
                                        .DETAIL(id)
                                }
                            />
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
