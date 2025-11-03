import { useState } from "react";
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
import type { IRecording } from "@/entities/reading/recordings/model/model";

/**
 * RecordingListProps - Interface for RecordingList component props
 */
interface RecordingListProps {
    recordings: IRecording[];
    isLoading?: boolean;
    onDelete?: () => void;
}

/**
 * RecordingList - Pure UI component for displaying reading recordings
 * @param props - The props for the RecordingList component
 * @param props.recordings - Array of recordings to display
 * @param props.isLoading - Whether the recordings are loading
 * @param props.onDelete - Handler for auto merge action
 * @returns RecordingList component
 */
export const RecordingList = ({
    recordings,
    isLoading = false,
    onDelete,
}: RecordingListProps) => {
    const [showAutoMergeDialog, setShowAutoMergeDialog] = useState(false);

    /**
     * formatTime - Format minutes into hours or minutes
     * @param minutes - The number of minutes
     * @returns Formatted time string
     */
    const formatTime = (minutes: number): string => {
        const hours = minutes / 60;
        return hours >= 1 ? `${hours.toFixed(1)}h` : `${minutes}m`;
    };

    /**
     * handleAutoMerge - Handler for auto merge confirmation
     */
    const handleAutoMerge = () => {
        if (onDelete) {
            onDelete();
        }
        setShowAutoMergeDialog(false);
    };

    /**
     * formatDate - Format date string
     * @param dateString - The date string to format
     * @returns Formatted date string
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Reading Recordings
                </CardTitle>
                {onDelete && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowAutoMergeDialog(true)}
                    >
                        <GitMerge className="h-4 w-4" />
                        Auto Merge
                    </Button>
                )}
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
                                            {formatDate(recording.date)}
                                        </TableCell>
                                        <TableCell>{recording.pages}</TableCell>
                                        <TableCell>
                                            {formatTime(recording.minutes) !==
                                            "0m"
                                                ? formatTime(recording.minutes)
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
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

            {onDelete && (
                <DeleteDialog
                    open={showAutoMergeDialog}
                    onOpenChange={setShowAutoMergeDialog}
                    title="Auto Merge"
                    description="Are you sure you want to perform an auto merge? This action will automatically merge the current recordings with the latest data."
                    onConfirm={handleAutoMerge}
                />
            )}
        </Card>
    );
};
