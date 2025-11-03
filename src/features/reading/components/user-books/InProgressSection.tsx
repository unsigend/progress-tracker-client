import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BookCover } from "@/components/common/BookCover";
import { Plus } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IUserBookWithBook } from "@/entities/reading/user-books/model/model";
import { useNavigate } from "react-router";

/**
 * InProgressSectionProps - Interface for InProgressSection component props
 */
interface InProgressSectionProps {
    inProgressBooks: IUserBookWithBook[];
    isLoading?: boolean;
}

/**
 * InProgressSection - Pure UI component for displaying in-progress reading books
 * @param props - The props for the InProgressReadingSection component
 * @param props.inProgressBooks - Array of in-progress books
 * @param props.isLoading - Whether the data is loading
 * @returns InProgressSection component
 */
export const InProgressSection = ({
    inProgressBooks,
    isLoading = false,
}: InProgressSectionProps) => {
    const [showAllBooks, setShowAllBooks] = useState(false);
    const navigate = useNavigate();
    // Filter out user books without book data
    const validBooks = inProgressBooks.filter((ub) => ub.book !== null);
    const maxDisplayBooks = 3;
    const displayBooks = showAllBooks
        ? validBooks
        : validBooks.slice(0, maxDisplayBooks);
    const hasMoreBooks = validBooks.length > maxDisplayBooks;

    /**
     * handleViewAllClick - Handler for view all/show less button
     */
    const handleViewAllClick = () => {
        setShowAllBooks(!showAllBooks);
    };

    if (isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        In Progress Reading
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                    In Progress Reading
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS()
                                    .LIST()
                            )
                        }
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {validBooks.length > 0 ? (
                    <div className="space-y-4">
                        {displayBooks.map((userBook) => {
                            const book = userBook.book!;
                            const progressPercentage = Math.round(
                                (userBook.currentPage / book.pages) * 100
                            );

                            return (
                                <div
                                    key={userBook.id}
                                    className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                                >
                                    {/* Left Container - Book Cover */}
                                    <div className="flex-shrink-0">
                                        <BookCover
                                            image={book.coverUrl || ""}
                                            alt={book.title || "Book cover"}
                                            to={ROUTES_CONSTANTS.DASHBOARD()
                                                .READING()
                                                .USER_BOOKS()
                                                .DETAIL(userBook.id)}
                                            className="w-25 h-32"
                                        />
                                    </div>

                                    {/* Right Container - Book Info and Progress */}
                                    <div className="flex-1 min-w-0 lg:px-8">
                                        <div className="space-y-2">
                                            {/* Book Title and Author */}
                                            <div>
                                                <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
                                                    {book.title.includes(":")
                                                        ? book.title.split(
                                                              ":"
                                                          )[0]
                                                        : book.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    by{" "}
                                                    {book.author || "Unknown"}
                                                </p>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-muted-foreground">
                                                        {userBook.currentPage} /{" "}
                                                        {book.pages} pages
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {progressPercentage}%
                                                    </span>
                                                </div>
                                                {/* TODO: Replace with Progress component when available */}
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${progressPercentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* View All / Show Less Button */}
                        {hasMoreBooks && (
                            <div className="flex justify-center pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="px-6"
                                    onClick={handleViewAllClick}
                                >
                                    {showAllBooks ? "Show Less" : "View More"}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">Currently reading</p>
                            <p className="text-sm">
                                Your active books will show up here
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
