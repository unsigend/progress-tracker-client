import { useParams } from "react-router";
import { BookDetail } from "@/features/reading/components/books/BookDetail";
import { NotFoundPage } from "@/pages/not-found";

/**
 * BookDetailPage - The page for displaying book details
 * @returns BookDetailPage component
 */
export const BookDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    
    if (!id) {
        return <NotFoundPage />;
    }
    
    return <BookDetail bookId={id} />;
};
