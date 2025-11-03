import { Link } from "react-router";
import { useState } from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { SmartPagination } from "@/components/common/SmartPagination";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookGrid } from "./BookGrid";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IBook } from "@/entities/reading/books/models/model";

/**
 * BookLibraryProps - Interface for BookLibrary component props
 */
interface BookLibraryProps {
    books: IBook[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    onSearchSubmit: (term: string) => void;
}

/**
 * BookLibrary - Pure UI component for displaying the book library
 * @param props - The props for the BookLibrary component
 * @param props.books - Array of books to display
 * @param props.isLoading - Whether the books are loading
 * @param props.currentPage - Current page number
 * @param props.totalPages - Total number of pages
 * @param props.setCurrentPage - Handler for setting the current page
 * @param props.onSearchSubmit - Handler for search form submission
 * @returns BookLibrary component
 */
export const BookLibrary = ({
    books,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    onSearchSubmit,
}: BookLibraryProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearchSubmit(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm("");
        onSearchSubmit("");
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="pb-4">
                    {/* Library Title - Centered above search */}
                    <div className="flex justify-center mb-6">
                        <h1
                            className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                    dark:from-gray-50 dark:via-gray-200 dark:to-gray-50 bg-clip-text text-transparent"
                        >
                            The Library
                        </h1>
                    </div>

                    {/* Search Section - Centered */}
                    <div className="flex justify-center mb-4">
                        <div className="w-full max-w-2xl">
                            <SearchBar
                                placeholder="Search by title, author, or ISBN..."
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onClear={handleClear}
                                size="large"
                                onSubmit={handleSearchSubmit}
                            />
                        </div>
                    </div>

                    {/* Add Book Button - Right Aligned */}
                    <div className="flex justify-end mb-4">
                        <Link
                            to={ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS()
                                .NEW()}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                Add Book
                            </Button>
                        </Link>
                    </div>
                </CardHeader>

                <CardContent className="min-h-[700px]">
                    {/* Loading State */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="size-6 animate-spin" />
                        </div>
                    ) : (
                        <BookGrid
                            books={books.map((book) => ({
                                id: book.id,
                                coverUrl: book.coverUrl,
                                title: book.title,
                                author: book.author,
                            }))}
                        />
                    )}
                </CardContent>

                <div className="mt-5 pb-4">
                    {/* Pagination */}
                    <SmartPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </Card>
        </div>
    );
};
