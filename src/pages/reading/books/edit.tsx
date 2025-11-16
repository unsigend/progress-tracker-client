import { useParams } from "react-router";
import { BookForm } from "@/features/reading/components/books/BookForm";

/**
 * BookEditPage - The page for editing a book
 * @returns BookEditPage component
 */
export const BookEditPage = () => {
    const { id } = useParams<{ id: string }>();
    
    return <BookForm mode="edit" bookId={id} />;
};
