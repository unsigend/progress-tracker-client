import { BookLibrary } from "@/features/reading/components/books/BookLibrary";
import { useBooks } from "@/entities/reading/books/hooks/useBooks";
import { useBookQuery } from "@/entities/reading/books/hooks/useBookQuery";

/**
 * BookListContainer - Container component for the book list page
 * Handles URL params, search, and pagination logic
 * @returns BookListContainer component
 */
export const BookListContainer = () => {
    const { query, setPage, setValue } = useBookQuery();
    const { data: booksData, isLoading } = useBooks(query);
    const totalCount = booksData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / query.limit);

    return (
        <BookLibrary
            books={booksData?.books || []}
            isLoading={isLoading}
            currentPage={query.page}
            totalPages={totalPages}
            setCurrentPage={setPage}
            onSearchSubmit={setValue}
        />
    );
};
