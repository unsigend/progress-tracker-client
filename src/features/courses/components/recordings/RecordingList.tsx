import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2, Calendar, GraduationCap } from "lucide-react";
import type { CourseRecording } from "@/entities/course/recordings/models/model";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { TextUtils } from "@/lib/utils/text";

/**
 * RecordingListProps - Interface for RecordingList component props
 */
interface RecordingListProps {
    recordings: CourseRecording[];
    isLoading?: boolean;
}

/**
 * RecordingList - Pure UI component for displaying course recordings in a table format
 * @param props - The props for the RecordingList component
 * @param props.recordings - Array of course recordings to display
 * @param props.isLoading - Whether the recordings are loading
 * @returns RecordingList component
 */
export const RecordingList = ({
    recordings,
    isLoading = false,
}: RecordingListProps) => {
    // Group recordings by date and organize by record type
    const { groupedRecordings, availableRecordTypes } = useMemo(() => {
        const grouped = new Map<
            string,
            Map<string, { minutes: number; id: string }>
        >();
        const recordTypeSet = new Set<string>();

        // Group recordings by date and collect all existing record types
        recordings.forEach((recording) => {
            const dateKey = recording.date.split("T")[0];
            if (!grouped.has(dateKey)) {
                grouped.set(dateKey, new Map());
            }
            const dateRecordings = grouped.get(dateKey)!;
            dateRecordings.set(recording.recordType, {
                minutes: recording.minutes,
                id: recording.id,
            });
            recordTypeSet.add(recording.recordType);
        });

        // Get all predefined record types in order
        const predefinedTypes =
            COURSE_CONSTANTS.RECORDING.PREDEFINED_RECORD_TYPES;

        // Filter to only include record types that exist in the data
        // and maintain the predefined order
        const availableTypes = predefinedTypes.filter((type) =>
            recordTypeSet.has(type)
        );

        // Convert to array and sort by date (newest first)
        const sortedRecordings = Array.from(grouped.entries())
            .map(([date, recordTypes]) => ({
                date,
                recordTypes,
            }))
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );

        return {
            groupedRecordings: sortedRecordings,
            availableRecordTypes: availableTypes,
        };
    }, [recordings]);

    /**
     * formatRecordType - Format record type for display
     * @param recordType - The record type to format
     * @returns Formatted record type string
     */
    const formatRecordType = (recordType: string): string => {
        return recordType.charAt(0) + recordType.slice(1).toLowerCase();
    };

    /**
     * formatMinutes - Format minutes for display
     * @param minutes - The minutes to format
     * @returns Formatted time string
     */
    const formatMinutes = (minutes: number): string => {
        return minutes === 0 ? "N/A" : TextUtils.formatDurationShort(minutes);
    };

    /**
     * calculateTotal - Calculate total minutes for a date
     * @param recordTypes - Map of record types to minutes
     * @returns Total minutes
     */
    const calculateTotal = (
        recordTypes: Map<string, { minutes: number; id: string }>
    ): number => {
        let total = 0;
        recordTypes.forEach(({ minutes }) => {
            total += minutes;
        });
        return total;
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Course Recordings
                </CardTitle>
            </CardHeader>

            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center py-8">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                </CardContent>
            ) : groupedRecordings.length === 0 ? (
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">
                            No recordings found
                        </p>
                        <p className="text-sm">
                            Start tracking your course progress to see
                            recordings here
                        </p>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="p-0 sm:p-6">
                    <div className="overflow-x-auto">
                        <div className="overflow-hidden rounded-md border min-w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="sticky left-0 bg-background z-10 min-w-[120px] font-semibold">
                                            Date
                                        </TableHead>
                                        {availableRecordTypes.map(
                                            (recordType) => (
                                                <TableHead
                                                    key={recordType}
                                                    className="text-center min-w-[100px]"
                                                >
                                                    {formatRecordType(
                                                        recordType
                                                    )}
                                                </TableHead>
                                            )
                                        )}
                                        <TableHead className="text-center font-semibold min-w-[100px] bg-muted/50">
                                            Total
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {groupedRecordings.map(
                                        ({
                                            date,
                                            recordTypes: dateRecordings,
                                        }) => {
                                            const total =
                                                calculateTotal(dateRecordings);
                                            return (
                                                <TableRow
                                                    key={date}
                                                    className="hover:bg-muted/50"
                                                >
                                                    <TableCell className="font-medium sticky left-0 bg-background z-10">
                                                        {date}
                                                    </TableCell>
                                                    {availableRecordTypes.map(
                                                        (recordType) => {
                                                            const recording =
                                                                dateRecordings.get(
                                                                    recordType
                                                                );
                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        recordType
                                                                    }
                                                                    className="text-center"
                                                                >
                                                                    {recording ? (
                                                                        formatMinutes(
                                                                            recording.minutes
                                                                        )
                                                                    ) : (
                                                                        <span className="text-muted-foreground italic">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                    )}
                                                    <TableCell className="text-center font-semibold bg-muted/30">
                                                        {formatMinutes(total)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
