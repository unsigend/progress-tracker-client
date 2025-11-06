import { useState, useEffect } from "react";
import { BookLibrary } from "@/features/reading/components/books/BookLibrary";
import { useBooks } from "@/entities/reading/books/hooks/useBooks";
import { useBookQuery } from "@/entities/reading/books/hooks/useBookQuery";

/**
 * BookListContainer - Container component for the book list page
 * Handles URL params, search, and pagination logic
 * @returns BookListContainer component
 */
export const BookListContainer = () => {
    const { query, setPage, setValue, setSort, setOrder } = useBookQuery();
    const { data: booksData, isLoading } = useBooks(query);

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const totalCount = booksData?.totalCount;
        if (totalCount !== undefined) {
            setTotalPages(Math.ceil(totalCount / query.limit));
        }
    }, [booksData?.totalCount, query.limit]);

    return (
        <BookLibrary
            books={booksData?.books || []}
            isLoading={isLoading}
            currentPage={query.page}
            totalPages={totalPages}
            setCurrentPage={setPage}
            onSearchSubmit={setValue}
            sort={query.sort}
            order={query.order}
            onSortChange={setSort}
            onOrderChange={setOrder}
        />
    );
};
