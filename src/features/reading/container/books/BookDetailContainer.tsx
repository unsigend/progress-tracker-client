import { toast } from "sonner";
import { useParams, useNavigate } from "react-router";
import { BookShowCard } from "@/features/reading/components/books/BookShowCard";
import { useBook } from "@/entities/reading/books/hooks/useBook";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useDeleteBook } from "@/entities/reading/books/hooks/useDeleteBook";
import { useCreateUserBook } from "@/entities/reading/user-books/hooks/useCreateUserBook";
import type { IUserBookCreate } from "@/entities/reading/user-books/model/model";

/**
 * BookDetailContainer - Container component for displaying book details
 * Handles data fetching and action handlers
 * @returns BookDetailContainer component
 */
export const BookDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: book, isLoading } = useBook(id || "");
    const { mutate: createUserBook } = useCreateUserBook();

    /**
     * handleAddClick - Handle add book to reading list functionality
     * @description Add book to reading list functionality
     */
    const handleAddClick = () => {
        if (!book) return;
        const userBook: IUserBookCreate = {
            bookId: book.id,
        };
        createUserBook(userBook, {
            onSuccess: () => {
                toast.success("Book added to reading list successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
    };

    /**
     * handleEditClick - Handle edit book functionality
     * @description Edit book functionality
     */
    const handleEditClick = () => {
        if (!id) return;
        navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().EDIT(id));
    };

    /**
     * deleteBook - Hook for deleting a book
     * @description Delete book functionality
     */
    const { mutate: deleteBook } = useDeleteBook(id || "");
    const handleDeleteConfirm = () => {
        if (!id) return;
        deleteBook(undefined, {
            onSuccess: () => {
                toast.success("Book deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().LIST());
            },
        });
    };

    return (
        <BookShowCard
            book={book || null}
            isLoading={isLoading}
            onAddClick={handleAddClick}
            onEditClick={handleEditClick}
            onDeleteConfirm={handleDeleteConfirm}
            onBack={() => navigate(-1)}
        />
    );
};
