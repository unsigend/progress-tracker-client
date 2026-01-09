import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Calendar, BookOpen, GitMerge } from "lucide-react";
import { SmartPagination } from "@/components/common/SmartPagination";
import { useReadingRecordings } from "@/features/reading/api/recordings/hooks/useRecordings";
import { useDeleteReadingRecordings } from "@/features/reading/api/recordings/hooks/useDeleteRecordings";
import { TextUtils } from "@/lib/utils/text";
import { DatesUtils } from "@/lib/utils/dates";
import { READING_CONSTANTS } from "@/constants/reading.constant";
import { cn } from "@/lib/utils";

/**
 * RecordingListProps - Interface for RecordingList component props
 */
interface RecordingListProps {
    userBookId: string;
}

/**
 * RecordingList - Smart component for displaying reading recordings
 * Handles its own data fetching and auto merge action
 * @param props - The props for the RecordingList component
 * @param props.userBookId - The user book ID to fetch recordings for
 * @returns RecordingList component
 */
export const RecordingList = ({ userBookId }: RecordingListProps) => {
    const [showAutoMergeDialog, setShowAutoMergeDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(
        READING_CONSTANTS.RECORDINGS.DEFAULT_PAGE
    );

    const query = {
        page: currentPage,
        limit: READING_CONSTANTS.RECORDINGS.DEFAULT_LIMIT,
        sort: READING_CONSTANTS.RECORDINGS.DEFAULT_SORT,
        order: READING_CONSTANTS.RECORDINGS.DEFAULT_ORDER,
    };

    const { data: recordingsData, isLoading } = useReadingRecordings(
        userBookId,
        query
    );
    const { mutate: deleteRecordings } = useDeleteReadingRecordings(userBookId);

    const recordings = recordingsData?.recordings ?? [];

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const totalCount = recordingsData?.totalCount;
        if (totalCount !== undefined) {
            setTotalPages(
                Math.ceil(
                    totalCount / READING_CONSTANTS.RECORDINGS.DEFAULT_LIMIT
                )
            );
        }
    }, [recordingsData?.totalCount]);

    const handleAutoMerge = () => {
        deleteRecordings(undefined, {
            onSuccess: () => {
                toast.success("Auto-merged recordings");
                setCurrentPage(READING_CONSTANTS.RECORDINGS.DEFAULT_PAGE);
            },
        });
        setShowAutoMergeDialog(false);
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pb-4">
                <CardTitle className="flex items-center gap-2.5 text-lg sm:text-xl font-semibold">
                    <div className="p-1.5 bg-muted rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    Reading Recordings
                </CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 w-full sm:w-auto"
                    onClick={() => setShowAutoMergeDialog(true)}
                >
                    <GitMerge className="h-4 w-4" />
                    Auto Merge
                </Button>
            </CardHeader>

            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="size-8 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            ) : recordings.length === 0 ? (
                <CardContent>
                    <div className="text-center py-16 text-muted-foreground">
                        <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                            <BookOpen className="h-8 w-8 opacity-60" />
                        </div>
                        <p className="text-lg font-semibold mb-1.5">
                            No recordings found
                        </p>
                        <p className="text-sm">
                            Start reading to see your progress here
                        </p>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="p-0 sm:p-6 overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block px-4 sm:px-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-2 hover:bg-transparent">
                                        <TableHead className="min-w-[120px] sm:min-w-[140px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-center min-w-[80px] sm:min-w-[100px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                            Pages
                                        </TableHead>
                                        <TableHead className="text-center min-w-[80px] sm:min-w-[100px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                            Time
                                        </TableHead>
                                        <TableHead className="min-w-[150px] sm:min-w-[200px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                            Notes
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recordings.map((recording, index) => (
                                        <TableRow
                                            key={recording.id}
                                            className={cn(
                                                "hover:bg-muted/30 transition-colors",
                                                index ===
                                                    recordings.length - 1 &&
                                                    "border-b-0"
                                            )}
                                        >
                                            <TableCell className="font-medium px-2 sm:px-4 py-2.5 sm:py-3.5 whitespace-nowrap">
                                                <span className="text-xs sm:text-sm text-foreground">
                                                    {DatesUtils.formatDate(
                                                        recording.date
                                                    )}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center px-2 sm:px-4 py-2.5 sm:py-3.5">
                                                <span className="text-xs sm:text-sm font-medium text-foreground">
                                                    {recording.pages}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center px-2 sm:px-4 py-2.5 sm:py-3.5">
                                                {recording.minutes ? (
                                                    <span className="text-xs sm:text-sm font-medium text-foreground">
                                                        {TextUtils.formatDurationShort(
                                                            recording.minutes
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] sm:text-xs text-muted-foreground/60 italic">
                                                        N/A
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-2 sm:px-4 py-2.5 sm:py-3.5">
                                                {recording.notes &&
                                                recording.notes.length > 0 ? (
                                                    <span className="text-xs sm:text-sm text-foreground line-clamp-2">
                                                        {recording.notes}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] sm:text-xs text-muted-foreground/60 italic">
                                                        No notes
                                                    </span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            )}

            {recordings.length > 0 && totalPages > 0 && (
                <div className="mt-5 pb-4">
                    <SmartPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={
                            setCurrentPage as (page: number) => void
                        }
                    />
                </div>
            )}

            <DeleteDialog
                open={showAutoMergeDialog}
                onOpenChange={setShowAutoMergeDialog}
                title="Auto Merge"
                description="Are you sure you want to perform an auto merge? 
                This action will automatically merge the current recordings
                with the latest data."
                onConfirm={handleAutoMerge}
            />
        </Card>
    );
};
