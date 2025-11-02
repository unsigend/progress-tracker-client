import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/components/ui/pagination";

/**
 * SmartPaginationProps - Interface for SmartPagination component props
 */
interface SmartPaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

/**
 * SmartPagination - Component for displaying smart pagination with ellipsis
 * @param props - The props for the SmartPagination component
 * @param props.currentPage - The current page number
 * @param props.totalPages - The total number of pages
 * @param props.setCurrentPage - Handler for setting the current page
 * @returns SmartPagination component
 */
export const SmartPagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}: SmartPaginationProps) => {
    /**
     * Handle previous page navigation
     */
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    /**
     * Handle next page navigation
     */
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    /**
     * Generate smart page numbers with ellipsis
     * @returns Array of page numbers or ellipsis strings
     */
    const generatePageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if total pages <= 7
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Smart pagination logic
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            // Always show first page
            pages.push(1);

            // Add ellipsis if there's a gap after page 1
            if (startPage > 2) {
                pages.push("ellipsis-start");
            }

            // Add pages around current page
            for (let i = startPage; i <= endPage; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            // Add ellipsis if there's a gap before last page
            if (endPage < totalPages - 1) {
                pages.push("ellipsis-end");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Page */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={
                            currentPage > 1 ? handlePreviousPage : undefined
                        }
                        className={
                            currentPage > 1
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                        }
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => setCurrentPage(page as number)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Page */}
                <PaginationItem>
                    <PaginationNext
                        onClick={
                            currentPage < totalPages
                                ? handleNextPage
                                : undefined
                        }
                        className={
                            currentPage < totalPages
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

