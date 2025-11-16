import { useState } from "react";
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
import { useReadingRecordings } from "@/features/reading/api/recordings/hooks/useRecordings";
import { useDeleteReadingRecordings } from "@/features/reading/api/recordings/hooks/useDeleteRecordings";
import { TextUtils } from "@/lib/utils/text";
import { DatesUtils } from "@/lib/utils/dates";
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

    const { data: recordingsData, isLoading } = useReadingRecordings(userBookId);
    const { mutate: deleteRecordings } = useDeleteReadingRecordings(userBookId);

    const recordings = recordingsData?.recordings ?? [];

    const handleAutoMerge = () => {
        deleteRecordings(undefined, {
            onSuccess: () => {
                toast.success("Auto-merged recordings");
            },
        });
        setShowAutoMergeDialog(false);
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2.5 text-xl font-semibold">
                    <div className="p-1.5 bg-muted rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    Reading Recordings
                </CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
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
                <CardContent className="p-0 sm:p-6">
                    <div className="overflow-x-auto -mx-6 sm:mx-0">
                        <div className="min-w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-2 hover:bg-transparent">
                                        <TableHead className="min-w-[140px] font-semibold text-foreground h-12 px-4">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-center min-w-[100px] font-semibold text-foreground h-12 px-4">
                                            Pages
                                        </TableHead>
                                        <TableHead className="text-center min-w-[100px] font-semibold text-foreground h-12 px-4">
                                            Time
                                        </TableHead>
                                        <TableHead className="min-w-[200px] font-semibold text-foreground h-12 px-4">
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
                                                index === recordings.length - 1 && "border-b-0"
                                            )}
                                        >
                                            <TableCell className="font-medium px-4 py-3.5 whitespace-nowrap">
                                                <span className="text-sm text-foreground">
                                                    {DatesUtils.formatDate(recording.date)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center px-4 py-3.5">
                                                <span className="text-sm font-medium text-foreground">
                                                    {recording.pages}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center px-4 py-3.5">
                                                {recording.minutes ? (
                                                    <span className="text-sm font-medium text-foreground">
                                                        {TextUtils.formatDurationShort(recording.minutes)}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground/60 italic">
                                                        N/A
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-4 py-3.5">
                                                {recording.notes &&
                                                recording.notes.length > 0 ? (
                                                    <span className="text-sm text-foreground">
                                                        {recording.notes}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground/60 italic">
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
