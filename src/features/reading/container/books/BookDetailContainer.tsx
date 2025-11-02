import { useParams, useNavigate } from "react-router";
import { BookShowCard } from "@/features/reading/components/books/BookShowCard";
import { useBook } from "@/entities/books/hooks/useBook";
import { toast } from "sonner";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useDeleteBook } from "@/entities/books/hooks/useDeleteBook";

/**
 * BookDetailContainer - Container component for displaying book details
 * Handles data fetching and action handlers
 * @returns BookDetailContainer component
 */
export const BookDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: book, isLoading } = useBook(id || "");

    // TODO: Implement useCreateUserBook hook
    const handleAddClick = () => {
        // TODO: Implement add book to reading list
        // createUserBook({ id: id ?? "" }, { onSuccess: ... });
        toast.info("Add to reading list functionality coming soon");
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
