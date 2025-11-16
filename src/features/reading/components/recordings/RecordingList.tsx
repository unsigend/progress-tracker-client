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
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
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
                    <div className="flex justify-center py-8">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                </CardContent>
            ) : recordings.length === 0 ? (
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">
                            No recordings found
                        </p>
                        <p className="text-sm">
                            Start reading to see your progress here
                        </p>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="p-0 sm:p-6">
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Pages</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recordings.map((recording) => (
                                    <TableRow
                                        key={recording.id}
                                        className="hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            {recording.date.split("T")[0]}
                                        </TableCell>
                                        <TableCell>{recording.pages}</TableCell>
                                        <TableCell>
                                            {recording.minutes
                                                ? TextUtils.formatDurationShort(recording.minutes)
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {recording.notes &&
                                            recording.notes.length > 0 ? (
                                                recording.notes
                                            ) : (
                                                <span className="italic opacity-50">
                                                    No notes
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
