import { useState, useEffect } from "react";
import { Link } from "react-router";
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
import { BookCover } from "@/components/common/BookCover";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useBooks } from "@/features/reading/api/books/hooks/useBooks";
import { useBookQuery } from "@/features/reading/api/books/hooks/useBookQuery";
import type { BookQuery } from "@/features/reading/api/books/models/model";

/**
 * BooksList - Smart component for displaying the book library
 * Handles data fetching, search, filtering, and pagination
 * @returns BooksList component
 */
export const BooksList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { query, setPage, setValue, setSort, setOrder } = useBookQuery();
    const { data: booksData, isLoading } = useBooks(query);

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const totalCount = booksData?.totalCount;
        if (totalCount !== undefined) {
            setTotalPages(Math.ceil(totalCount / query.limit));
        }
    }, [booksData?.totalCount, query.limit]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm("");
        setValue("");
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="pb-4">
                    {/* Library Title */}
                    <div className="flex justify-center mb-6">
                        <h1
                            className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                    dark:from-gray-50 dark:via-gray-200 dark:to-gray-50 bg-clip-text text-transparent"
                        >
                            The Book Library
                        </h1>
                    </div>

                    {/* Search Section */}
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

                    {/* Sort Controls + Add Book Button */}
                    <div className="flex items-center justify-between gap-4 mt-4">
                        {/* Sort and Order Controls */}
                        <div className="flex items-center gap-3">
                            <Select
                                value={query.sort}
                                onValueChange={(value) =>
                                    setSort(value as BookQuery["sort"])
                                }
                            >
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

                            <Select
                                value={query.order}
                                onValueChange={(value) =>
                                    setOrder(value as BookQuery["order"])
                                }
                            >
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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-30">
                            <Loader2 className="size-6 animate-spin" />
                        </div>
                    ) : (booksData?.books || []).length > 0 ? (
                        <div className="grid gap-6 w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-10">
                            {(booksData?.books || []).map((book) => (
                                <div
                                    key={book.id}
                                    className="flex justify-center"
                                >
                                    <BookCover
                                        image={
                                            book.coverUrl ||
                                            "/placeholder-book.jpg"
                                        }
                                        alt={
                                            book.title
                                                ? `${book.title} by ${
                                                      book.author ||
                                                      "Unknown Author"
                                                  }`
                                                : "Book cover"
                                        }
                                        to={ROUTES_CONSTANTS.DASHBOARD()
                                            .READING()
                                            .BOOKS()
                                            .DETAIL(book.id)}
                                        className="transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground text-sm">
                                No books Found
                            </p>
                        </div>
                    )}
                </CardContent>

                <div className="mt-5 pb-4">
                    <SmartPagination
                        currentPage={query.page}
                        totalPages={totalPages}
                        setCurrentPage={setPage}
                    />
                </div>
            </Card>
        </div>
    );
};
