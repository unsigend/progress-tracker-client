import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BackButton } from "@/components/common/BackButton";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { BookCover } from "@/components/common/BookCover";
import { useBook } from "@/features/reading/api/books/hooks/useBook";
import { useDeleteBook } from "@/features/reading/api/books/hooks/useDeleteBook";
import { useCreateUserBook } from "@/features/reading/api/user-books/hooks/useCreateUserBook";
import { useMe } from "@/entities/users/hooks/useMe";
import { UserRole } from "@/entities/users/models/model";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { UserBookCreate } from "@/features/reading/api/user-books/model/model";

/**
 * BookDetailProps - Interface for BookDetail component props
 */
interface BookDetailProps {
    bookId: string;
}

/**
 * BookDetail - Smart component for displaying book details
 * Handles data fetching and actions (add, edit, delete)
 * @param props - The props for the BookDetail component
 * @param props.bookId - The book ID to display
 * @returns BookDetail component
 */
export const BookDetail = ({ bookId }: BookDetailProps) => {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { data: book, isLoading } = useBook(bookId);
    const { data: currentUser } = useMe();
    const { mutate: createUserBook } = useCreateUserBook();
    const { mutate: deleteBook } = useDeleteBook(bookId);

    // Check if user has permission to edit/delete
    const hasPermission =
        !!book &&
        !!currentUser &&
        (book.createdBy === currentUser.id ||
            currentUser.role === UserRole.ADMIN);

    const handleAddClick = () => {
        if (!book) return;
        const userBook: UserBookCreate = {
            bookId: book.id,
        };
        createUserBook(userBook, {
            onSuccess: () => {
                toast.success("Book added to reading list successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
    };

    const handleEditClick = () => {
        navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().EDIT(bookId));
    };

    const handleDeleteConfirm = () => {
        deleteBook(undefined, {
            onSuccess: () => {
                toast.success("Book deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().LIST());
            },
        });
    };

    return (
        <div className="w-full max-w-7xl">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        <BackButton onClick={() => navigate(-1)} />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleAddClick}>
                                    Add
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleEditClick}
                                    disabled={!hasPermission}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setShowDeleteDialog(true)}
                                    disabled={!hasPermission}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="size-6 animate-spin" />
                        </div>
                    ) : book ? (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
                            {/* Book Information */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                                        {book.title || "Untitled"}
                                    </h1>
                                </div>

                                <div>
                                    <h2 className="text-base md:text-lg text-muted-foreground">
                                        by {book.author || "Unknown"}
                                    </h2>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                        Description
                                    </h3>
                                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                                        {book.description ||
                                            "No description available for this book."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            Pages
                                        </h4>
                                        <p className="text-foreground">
                                            {book.pages || "Unknown"}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            ISBN 10
                                        </h4>
                                        <p className="text-foreground font-mono text-sm">
                                            {book.ISBN10 || "Unknown"}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            ISBN 13
                                        </h4>
                                        <p className="text-foreground font-mono text-sm">
                                            {book.ISBN13 || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Book Cover */}
                            <div className="flex justify-start lg:flex-shrink-0">
                                <BookCover
                                    image={book.coverUrl || ""}
                                    alt={book.title || "unknown book cover"}
                                    className="w-40 h-52 md:w-48 md:h-64"
                                />
                            </div>
                        </div>
                    ) : null}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Book"
                description="Are you sure you want to delete this book? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};
