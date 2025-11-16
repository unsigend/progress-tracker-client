import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { BackButton } from "@/components/common/BackButton";
import { BookCover } from "@/components/common/BookCover";
import { Calendar, Clock, BookOpen, CalendarDays } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useUserBook } from "@/features/reading/api/user-books/hooks/useUserBook";
import { useDeleteUserBook } from "@/features/reading/api/user-books/hooks/useDeleteUserBook";
import { DatesUtils } from "@/lib/utils/dates";

/**
 * UserBookDetailProps - Interface for UserBookDetail component props
 */
interface UserBookDetailProps {
    userBookId: string;
}

/**
 * UserBookDetail - Smart component for displaying user book details
 * Handles its own data fetching and delete action
 * @param props - The props for the UserBookDetail component
 * @param props.userBookId - The user book ID to display
 * @returns UserBookDetail component
 */
export const UserBookDetail = ({ userBookId }: UserBookDetailProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const { data: userBook, isLoading } = useUserBook(userBookId);
    const { mutate: deleteUserBook } = useDeleteUserBook(userBookId);

    const handleDelete = () => {
        deleteUserBook(undefined, {
            onSuccess: () => {
                toast.success("Book deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
        setShowDeleteDialog(false);
    };

    if (isLoading || !userBook || !userBook.book) {
        return (
            <Card>
                <CardHeader>
                    <BackButton
                        onClick={() =>
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS()
                                    .LIST()
                            )
                        }
                    />
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex justify-center py-12">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const book = userBook.book;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <BackButton onClick={() => navigate(-1)} />
                <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-lg"
                    onClick={() => setShowDeleteDialog(true)}
                >
                    Delete
                </Button>
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Book Cover and Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Book Cover */}
                        <div className="flex justify-center lg:justify-start">
                            <BookCover
                                image={book.coverUrl || ""}
                                alt={book.title || "Book cover"}
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS()
                                    .DETAIL(book.id)}
                                className="w-48 h-64 lg:w-56 lg:h-72"
                            />
                        </div>

                        {/* Recording Status Badge */}
                        <div className="flex justify-center lg:justify-start">
                            <Badge
                                variant={
                                    userBook.status === "COMPLETED"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-sm px-4 py-2"
                            >
                                {userBook.status === "COMPLETED"
                                    ? "Completed"
                                    : "In Progress"}
                            </Badge>
                        </div>
                    </div>

                    {/* Right Column - Book Details and Recording Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Book Title and Author */}
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                                {book.title}
                            </h1>
                            <h2 className="text-xl text-muted-foreground">
                                by {book.author || "Unknown"}
                            </h2>
                        </div>

                        <Separator />

                        {/* Book Description */}
                        {book.description && (
                            <>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        About This Book
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>
                                <Separator />
                            </>
                        )}

                        {/* Recording Timeline */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Reading Timeline
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Start Date */}
                                {userBook.startDate && (
                                    <Card className="border-border/50">
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <Calendar className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">
                                                        Started Reading
                                                    </p>
                                                    <p className="font-semibold text-foreground">
                                                        {DatesUtils.formatDate(
                                                            userBook.startDate
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Complete Date */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <CalendarDays className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Completed
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    {userBook.completedDate
                                                        ? DatesUtils.formatDate(
                                                              userBook.completedDate
                                                          )
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Separator />

                        {/* Reading Statistics */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Reading Statistics
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Total Days */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-blue-500/10 rounded-lg mx-auto w-fit">
                                                <CalendarDays className="h-6 w-6 text-blue-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {userBook.totalDays}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Total Days
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Total Hours */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-purple-500/10 rounded-lg mx-auto w-fit">
                                                <Clock className="h-6 w-6 text-purple-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {
                                                        DatesUtils.formatDuration(
                                                            userBook.totalMinutes
                                                        ).value
                                                    }
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {
                                                        DatesUtils.formatDuration(
                                                            userBook.totalMinutes
                                                        ).unit
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Pages Read */}
                                <Card className="border-border/50">
                                    <CardContent className="p-4 text-center">
                                        <div className="space-y-2">
                                            <div className="p-2 bg-orange-500/10 rounded-lg mx-auto w-fit">
                                                <BookOpen className="h-6 w-6 text-orange-500 mx-auto" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {userBook.currentPage}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Pages Read
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Book"
                description="Are you sure you want to delete this book? This action cannot be undone and will remove all associated recordings."
                onConfirm={handleDelete}
            />
        </Card>
    );
};

