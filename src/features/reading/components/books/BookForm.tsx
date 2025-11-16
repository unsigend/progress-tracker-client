import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, User, FileText, Hash, Image, Loader2 } from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { FileUpload } from "@/components/common/FileUpload";
import { useCreateBook } from "@/features/reading/api/books/hooks/useCreateBook";
import { useUpdateBook } from "@/features/reading/api/books/hooks/useUpdateBook";
import { useBook } from "@/features/reading/api/books/hooks/useBook";
import { toast } from "sonner";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { TextUtils } from "@/lib/utils/text";
import type {
    BookCreate,
    BookUpdate,
} from "@/features/reading/api/books/models/model";

/**
 * BookFormProps - Interface for BookForm component props
 */
interface BookFormProps {
    mode: "create" | "edit";
    bookId?: string;
}

/**
 * BookForm - Smart component for creating or editing a book
 * Handles form state, data fetching, submission logic, and UI rendering
 * @param props - The props for the BookForm component
 * @param props.mode - Whether this is for creating or editing a book
 * @param props.bookId - The book ID for edit mode
 * @returns BookForm component
 */
export const BookForm = ({ mode, bookId }: BookFormProps) => {
    const navigate = useNavigate();

    const { data: existingBook, isLoading: isLoadingBook } = useBook(
        mode === "edit" && bookId ? bookId : ""
    );
    const { mutate: createBook, isPending: isCreating } = useCreateBook();
    const { mutate: updateBook, isPending: isUpdating } = useUpdateBook(
        bookId || ""
    );

    const [formData, setFormData] = useState<BookCreate | BookUpdate>(
        mode === "create"
            ? {
                  title: "",
                  author: "",
                  description: "",
                  pages: NaN,
                  ISBN10: "",
                  ISBN13: "",
              }
            : {
                  title: "",
                  author: "",
                  description: "",
                  pages: 0,
                  ISBN10: "",
                  ISBN13: "",
              }
    );

    // Load existing book data for edit mode
    useEffect(() => {
        if (mode === "edit" && existingBook) {
            setFormData({
                title: existingBook.title,
                author: existingBook.author || undefined,
                description: existingBook.description || undefined,
                pages: existingBook.pages,
                ISBN10: existingBook.ISBN10 || undefined,
                ISBN13: existingBook.ISBN13 || undefined,
            });
        }
    }, [existingBook, mode]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "create") {
            // Validation for create
            if (!formData.title || formData.title.trim() === "") {
                toast.error("Title is required");
                return;
            }
            if (!formData.pages || isNaN(formData.pages)) {
                toast.error("Pages is required");
                return;
            }

            createBook(formData as BookCreate, {
                onSuccess: () => {
                    toast.success("Book created successfully");
                    navigate(
                        ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().LIST()
                    );
                },
            });
        } else {
            // Update mode
            if (!bookId) {
                toast.error("Book ID is required");
                return;
            }

            updateBook(formData as BookUpdate, {
                onSuccess: () => {
                    toast.success("Book updated successfully");
                    navigate(
                        ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS()
                            .DETAIL(bookId)
                    );
                },
            });
        }
    };

    const handleFileUpload = async (file: File) => {
        setFormData((prev) => ({
            ...prev,
            coverImage: file,
        }));
    };

    const handleInputChange = <K extends keyof (BookCreate & BookUpdate)>(
        field: K,
        value: string | number | undefined | File
    ) => {
        if (mode === "create") {
            const createData: BookCreate = {
                title: formData.title || "",
                pages: formData.pages || 0,
            };
            if (formData.author) createData.author = formData.author;
            if (formData.description)
                createData.description = formData.description;
            if (formData.ISBN10) createData.ISBN10 = formData.ISBN10;
            if (formData.ISBN13) createData.ISBN13 = formData.ISBN13;
            if (formData.coverImage) createData.coverImage = formData.coverImage;

            setFormData({
                ...createData,
                [field]: value,
            } as BookCreate);
        } else {
            setFormData({
                ...formData,
                [field]: value,
            } as BookUpdate);
        }
    };

    const isLoading = mode === "create" ? isCreating : isLoadingBook || isUpdating;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader className="text-center">
                        {/* Back Button - Top Left */}
                        <div className="flex items-center justify-start mb-2">
                            <BackButton onClick={() => navigate(-1)} />
                        </div>

                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-muted rounded-full">
                                <BookOpen className="w-8 h-8 text-muted-foreground" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-semibold text-foreground">
                            {mode === "create" ? "Add New Book" : "Edit Book"}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                            {mode === "create"
                                ? "Fill in the details to add a new book to the public library"
                                : "Fill in the details to change the book"}
                        </p>
                    </CardHeader>

                    <CardContent className="min-h-[800px]">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="size-6 animate-spin" />
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Title Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="title"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Book Title
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Enter book title"
                                        value={formData.title || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* Author Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="author"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                                    >
                                        <User className="w-4 h-4" />
                                        Author
                                    </Label>
                                    <Input
                                        id="author"
                                        type="text"
                                        placeholder="Enter author name"
                                        value={formData.author || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "author",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="description"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Description
                                    </Label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter book description"
                                        value={formData.description || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full min-h-[200px] px-3 py-2 border border-input 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring
                             focus:border-transparent resize-none bg-background text-foreground"
                                    />
                                </div>

                                {/* Pages Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="pages"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Pages
                                    </Label>
                                    <Input
                                        id="pages"
                                        type="number"
                                        placeholder="Number of pages"
                                        value={formData.pages || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "pages",
                                                e.target.value === ""
                                                    ? undefined
                                                    : parseInt(e.target.value, 10)
                                            )
                                        }
                                        className="w-full"
                                    />
                                </div>

                                {/* ISBN 10 and ISBN 13 Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* ISBN 10 Field */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="isbn10"
                                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                                        >
                                            <Hash className="w-4 h-4" />
                                            ISBN 10
                                        </Label>
                                        <Input
                                            id="isbn10"
                                            type="text"
                                            placeholder="Enter ISBN 10"
                                            value={formData.ISBN10 || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ISBN10",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                    </div>

                                    {/* ISBN 13 Field */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="isbn13"
                                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                                        >
                                            <Hash className="w-4 h-4" />
                                            ISBN 13
                                        </Label>
                                        <Input
                                            id="isbn13"
                                            type="text"
                                            placeholder="Enter ISBN 13"
                                            value={formData.ISBN13 || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ISBN13",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Cover Image Section */}
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Image className="w-4 h-4" />
                                        Cover Image
                                    </Label>

                                    <div className="space-y-2">
                                        <FileUpload
                                            handleUpload={handleFileUpload}
                                            text="Choose Cover Image"
                                            icon={<Image className="w-4 h-4" />}
                                            acceptedFileTypes="image/*"
                                            maxFileSizeMB={1}
                                            className="w-full"
                                        />

                                        {/* Show selected file name */}
                                        {formData.coverImage && (
                                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                                <Image className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm text-foreground">
                                                    {formData.coverImage.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    (
                                                    {TextUtils.formatFileSize(
                                                        formData.coverImage.size
                                                    )}{" "}
                                                    MB)
                                                </span>
                                            </div>
                                        )}

                                        <p className="text-xs text-muted-foreground">
                                            Upload an image file (PNG, JPG, GIF
                                            up to 1MB)
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Link
                                        to={ROUTES_CONSTANTS.DASHBOARD()
                                            .READING()
                                            .BOOKS()
                                            .LIST()}
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="px-6"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit" className="px-6">
                                        {mode === "create"
                                            ? "Add Book"
                                            : "Update Book"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
