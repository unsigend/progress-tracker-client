import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BookActionForm } from "@/features/reading/components/books/BookActionForm";
import { useBook } from "@/entities/reading/books/hooks/useBook";
import { useUpdateBook } from "@/entities/reading/books/hooks/useUpdateBook";
import { toast } from "sonner";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IBookUpdate } from "@/entities/reading/books/models/model";

/**
 * BookEditContainer - Container component for editing a book
 * Handles form state, data fetching, and submission logic
 * @returns BookEditContainer component
 */
export const BookEditContainer = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading: isLoadingBook } = useBook(id || "");
    const { mutate: updateBook, isPending: isUpdating } = useUpdateBook(
        id || ""
    );

    const [formData, setFormData] = useState<IBookUpdate>({
        title: "",
        author: "",
        description: "",
        pages: 0,
        ISBN10: "",
        ISBN13: "",
    });

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author || "",
                description: book.description || "",
                pages: book.pages,
                ISBN10: book.ISBN10 || "",
                ISBN13: book.ISBN13 || "",
            });
        }
    }, [book]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) {
            toast.error("Book ID is required");
            return;
        }

        // Build book update data using IBookUpdate from model
        const bookData: IBookUpdate = {};

        if (formData.title !== book?.title) bookData.title = formData.title;
        if (formData.author !== book?.author) bookData.author = formData.author;
        if (formData.description !== book?.description)
            bookData.description = formData.description;
        if (formData.pages !== book?.pages) bookData.pages = formData.pages;
        if (formData.ISBN10 !== book?.ISBN10) bookData.ISBN10 = formData.ISBN10;
        if (formData.ISBN13 !== book?.ISBN13) bookData.ISBN13 = formData.ISBN13;
        if (formData.coverImage) bookData.coverImage = formData.coverImage;

        updateBook(bookData, {
            onSuccess: () => {
                toast.success("Book updated successfully");
                // Force a full page reload to clear browser image cache
                window.location.href = ROUTES_CONSTANTS.DASHBOARD()
                    .READING()
                    .BOOKS()
                    .LIST();
            },
        });
    };

    const handleFileUpload = async (file: File) => {
        setFormData((prev) => ({
            ...prev,
            coverImage: file,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <BookActionForm
                    title="Edit Book"
                    description="Fill in the details to change the book"
                    formData={formData}
                    onFormDataChange={(data) => {
                        setFormData(data as IBookUpdate);
                    }}
                    onSubmit={handleSubmit}
                    action="edit"
                    onFileUpload={handleFileUpload}
                    isLoading={isLoadingBook || isUpdating}
                />
            </div>
        </div>
    );
};
