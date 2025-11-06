import { Link } from "react-router";
import { useState } from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { SmartPagination } from "@/components/common/SmartPagination";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookGrid } from "./BookGrid";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IBook } from "@/entities/reading/books/models/model";
import type { IBookQuery } from "@/entities/reading/books/models/model";

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
    sort: IBookQuery["sort"];
    order: IBookQuery["order"];
    onSortChange: (sort: IBookQuery["sort"]) => void;
    onOrderChange: (order: IBookQuery["order"]) => void;
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
 * @param props.sort - Current sort field
 * @param props.order - Current sort order
 * @param props.onSortChange - Handler for sort field change
 * @param props.onOrderChange - Handler for sort order change
 * @returns BookLibrary component
 */
export const BookLibrary = ({
    books,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    onSearchSubmit,
    sort,
    order,
    onSortChange,
    onOrderChange,
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
                            The Book Library
                        </h1>
                    </div>

                    {/* Search Section - Centered */}
                    <div className="flex justify-center">
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

                    {/* Sort and Order Controls + Add Book Button Row */}
                    <div className="flex items-center justify-between gap-4 mt-4">
                        {/* Sort and Order Controls */}
                        <div className="flex items-center gap-3">
                            <Select value={sort} onValueChange={onSortChange}>
                                <SelectTrigger size="sm" className="w-[120px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="createdAt">
                                        Created At
                                    </SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={order} onValueChange={onOrderChange}>
                                <SelectTrigger size="sm" className="w-[90px]">
                                    <SelectValue placeholder="Order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">ASC</SelectItem>
                                    <SelectItem value="desc">DESC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Add Book Button */}
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
                        <div className="flex justify-center items-center py-30">
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
