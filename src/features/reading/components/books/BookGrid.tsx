import { cn } from "@/lib/utils";
import { BookCover } from "@/features/reading/components/books/BookCover";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * BookGridItem - Interface for a book item in the grid
 */
interface BookGridItem {
    id: string;
    coverUrl?: string | null;
    title?: string | null;
    author?: string | null;
}

/**
 * BookGridProps - Interface for BookGrid component props
 */
interface BookGridProps {
    books: BookGridItem[];
    className?: string;
    to?: (id: string) => string;
}

/**
 * BookGrid - Component for displaying a grid of book covers
 * @param props - The props for the BookGrid component
 * @param props.books - Array of book items to display
 * @param props.className - Additional CSS classes
 * @param props.to - Optional function to generate link URL (default: book detail page)
 * @returns BookGrid component
 */
export const BookGrid = ({
    books,
    className,
    to = (id: string) =>
        ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().DETAIL(id),
}: BookGridProps) => {
    if (!books || books.length === 0) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center py-12",
                    className
                )}
            >
                <p className="text-muted-foreground text-sm">No books Found</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-6 w-full",
                "grid-cols-2",
                "sm:grid-cols-3",
                "md:grid-cols-4",
                "lg:grid-cols-5",
                "xl:grid-cols-6",
                "2xl:grid-cols-7",
                "3xl:grid-cols-10",
                className
            )}
        >
            {books.map((book) => (
                <div key={book.id} className="flex justify-center">
                    <BookCover
                        image={book.coverUrl || "/placeholder-book.jpg"}
                        alt={
                            book.title
                                ? `${book.title} by ${
                                      book.author || "Unknown Author"
                                  }`
                                : "Book cover"
                        }
                        to={to(book.id)}
                        className="transition-transform duration-200 hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
};
