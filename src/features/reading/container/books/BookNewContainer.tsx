import { useState } from "react";
import { useNavigate } from "react-router";
import { BookActionForm } from "@/features/reading/components/books/BookActionForm";
import { useCreateBook } from "@/entities/reading/books/hooks/useCreateBook";
import { toast } from "sonner";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { BookCreate, BookUpdate } from "@/entities/reading/books/models/model";

/**
 * BookNewContainer - Container component for creating a new book
 * Handles form state and submission logic
 * @returns BookNewContainer component
 */
export const BookNewContainer = () => {
    const navigate = useNavigate();
    const { mutate: createBook, isPending } = useCreateBook();

    const [formData, setFormData] = useState<BookCreate>({
        title: "",
        author: "",
        description: "",
        pages: NaN,
        ISBN10: "",
        ISBN13: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple validation
        if (!formData.title || formData.title.trim() === "") {
            toast.error("Title is required");
            return;
        }
        if (!formData.pages || isNaN(formData.pages)) {
            toast.error("Pages is required");
            return;
        }
        createBook(formData, {
            onSuccess: () => {
                toast.success("Book created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().LIST());
            },
        });
    };

    const handleFileUpload = async (file: File) => {
        setFormData((prev) => ({
            ...prev,
            coverImage: file,
        }));
    };

    const handleFormDataChange = (data: BookCreate | BookUpdate) => {
        // For create, only use fields from BookCreate
        const createData: BookCreate = {
            title: data.title || "",
            pages: data.pages || 0,
        };
        if (data.author) createData.author = data.author;
        if (data.description) createData.description = data.description;
        if (data.ISBN10) createData.ISBN10 = data.ISBN10;
        if (data.ISBN13) createData.ISBN13 = data.ISBN13;
        if (data.coverImage) createData.coverImage = data.coverImage;
        setFormData(createData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <BookActionForm
                    title="Add New Book"
                    description="Fill in the details to add a new book to the public library"
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    onSubmit={handleSubmit}
                    action="add"
                    onFileUpload={handleFileUpload}
                    isLoading={isPending}
                />
            </div>
        </div>
    );
};
