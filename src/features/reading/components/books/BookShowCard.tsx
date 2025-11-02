import { useState } from "react";
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
import type { IBook } from "@/entities/books/models/model";

/**
 * BookShowCardProps - Interface for BookShowCard component props
 */
interface BookShowCardProps {
    book: IBook | null;
    isLoading: boolean;
    onAddClick: () => void;
    onEditClick: () => void;
    onDeleteConfirm: () => void;
    onBack?: () => void;
}

/**
 * BookShowCard - Pure UI component for displaying book details
 * @param props - The props for the BookShowCard component
 * @param props.book - The book data to display
 * @param props.isLoading - Whether the book is loading
 * @param props.onAddClick - Handler for add button click
 * @param props.onEditClick - Handler for edit button click
 * @param props.onDeleteConfirm - Handler for delete confirmation
 * @param props.onBack - Handler for back button click
 * @returns BookShowCard component
 */
export const BookShowCard = ({
    book,
    isLoading,
    onAddClick,
    onEditClick,
    onDeleteConfirm,
    onBack,
}: BookShowCardProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    return (
        <div className="w-full max-w-7xl">
            <Card>
                <CardContent className="p-8 md:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-6 flex justify-between items-center">
                        {/* Back to Library */}
                        <BackButton onClick={onBack} />

                        {/* Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={onAddClick}>
                                    Add
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onEditClick}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDeleteClick}>
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
                            {/* Book Information - Left Side */}
                            <div className="flex-1 space-y-8">
                                {/* Title */}
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                                        {book.title || "Untitled"}
                                    </h1>
                                </div>

                                {/* Author */}
                                <div>
                                    <h2 className="text-base md:text-lg text-muted-foreground">
                                        by {book.author || "Unknown"}
                                    </h2>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                        Description
                                    </h3>
                                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                                        {book.description ||
                                            "No description available for this book."}
                                    </p>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                    {/* Pages */}
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            Pages
                                        </h4>
                                        <p className="text-foreground">
                                            {book.pages || "Unknown"}
                                        </p>
                                    </div>

                                    {/* ISBN 10 */}
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            ISBN 10
                                        </h4>
                                        <p className="text-foreground font-mono text-sm">
                                            {book.ISBN10 || "Unknown"}
                                        </p>
                                    </div>

                                    {/* ISBN 13 */}
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

                            {/* Book Image - Right Side */}
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
                onConfirm={onDeleteConfirm}
            />
        </div>
    );
};
