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
import { useCourseRecordings } from "@/features/courses/api/recordings/hooks/useRecordings";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { TextUtils } from "@/lib/utils/text";
import { DatesUtils } from "@/lib/utils/dates";
import { cn } from "@/lib/utils";

/**
 * RecordingListProps - Interface for RecordingList component props
 */
interface RecordingListProps {
    userCourseId: string;
}

/**
 * RecordingList - Smart component for displaying course recordings in a table format
 * Handles its own data fetching
 * @param props - The props for the RecordingList component
 * @param props.userCourseId - The user course ID to fetch recordings for
 * @returns RecordingList component
 */
export const RecordingList = ({ userCourseId }: RecordingListProps) => {
    const { data: recordingsData, isLoading } =
        useCourseRecordings(userCourseId);

    // Group recordings by date and organize by record type
    const { groupedRecordings, availableRecordTypes } = useMemo(() => {
        const recordings = recordingsData?.recordings ?? [];
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
    }, [recordingsData?.recordings]);

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
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2.5 text-xl font-semibold">
                    <div className="p-1.5 bg-muted rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    Course Recordings
                </CardTitle>
            </CardHeader>

            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="size-8 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            ) : groupedRecordings.length === 0 ? (
                <CardContent>
                    <div className="text-center py-16 text-muted-foreground">
                        <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                            <GraduationCap className="h-8 w-8 opacity-60" />
                        </div>
                        <p className="text-lg font-semibold mb-1.5">
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
                    <div className="overflow-x-auto -mx-6 sm:mx-0">
                        <div className="min-w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-2 hover:bg-transparent">
                                        <TableHead className="sticky left-0 bg-background z-10 min-w-[140px] font-semibold text-foreground h-12 px-4">
                                            Date
                                        </TableHead>
                                        {availableRecordTypes.map(
                                            (recordType) => (
                                                <TableHead
                                                    key={recordType}
                                                    className="text-center min-w-[110px] font-semibold text-foreground h-12 px-4"
                                                >
                                                    {formatRecordType(
                                                        recordType
                                                    )}
                                                </TableHead>
                                            )
                                        )}
                                        <TableHead className="text-center font-semibold min-w-[110px] bg-muted/40 text-foreground h-12 px-4">
                                            Total
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {groupedRecordings.map(
                                        (
                                            {
                                                date,
                                                recordTypes: dateRecordings,
                                            },
                                            index
                                        ) => {
                                            const total =
                                                calculateTotal(dateRecordings);
                                            return (
                                                <TableRow
                                                    key={date}
                                                    className={cn(
                                                        "hover:bg-muted/30 transition-colors",
                                                        index ===
                                                            groupedRecordings.length -
                                                                1 &&
                                                            "border-b-0"
                                                    )}
                                                >
                                                    <TableCell className="font-medium sticky left-0 bg-background z-10 px-4 py-3.5 whitespace-nowrap">
                                                        <span className="text-sm text-foreground">
                                                            {DatesUtils.formatDate(
                                                                date
                                                            )}
                                                        </span>
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
                                                                    className="text-center px-4 py-3.5"
                                                                >
                                                                    {recording ? (
                                                                        <span className="text-sm font-medium text-foreground">
                                                                            {formatMinutes(
                                                                                recording.minutes
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs text-muted-foreground/60 italic">
                                                                            N/A
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }
                                                    )}
                                                    <TableCell className="text-center font-semibold bg-muted/20 px-4 py-3.5">
                                                        <span className="text-sm text-foreground">
                                                            {formatMinutes(
                                                                total
                                                            )}
                                                        </span>
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
