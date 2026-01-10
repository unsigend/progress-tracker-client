import { useMemo, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Loader2,
    Calendar,
    GraduationCap,
    Clock,
    FileText,
} from "lucide-react";
import { useCourseRecordings } from "@/features/courses/api/recordings/hooks/useRecordings";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { TextUtils } from "@/lib/utils/text";
import { DatesUtils } from "@/lib/utils/dates";
import { cn } from "@/lib/utils";
import { SmartPagination } from "@/components/common/SmartPagination";
import type { DailyRecord } from "@/features/courses/api/recordings/models/model";

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
    const [currentPage, setCurrentPage] = useState(
        COURSE_CONSTANTS.COURSE.DEFAULT_PAGE
    );
    const [viewMode, setViewMode] = useState<"time" | "notes">("time");

    const { data: recordingsData, isLoading } = useCourseRecordings(
        userCourseId,
        currentPage
    );

    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const totalDays = recordingsData?.totalDays;
        const pageSize = recordingsData?.pageSize;
        if (totalDays !== undefined && pageSize !== undefined) {
            setTotalPages(Math.ceil(totalDays / pageSize));
        }
    }, [recordingsData?.totalDays, recordingsData?.pageSize]);

    // Extract record types from current page's data and maintain predefined order
    const availableRecordTypes = useMemo(() => {
        const recordTypeSet = new Set<string>();
        const dailyRecords = recordingsData?.dailyRecords ?? [];

        // Collect all record types that appear in the current page's data
        dailyRecords.forEach((record) => {
            Object.keys(record).forEach((key) => {
                if (
                    key !== "date" &&
                    key !== "total" &&
                    typeof record[key] === "object" &&
                    record[key] !== null
                ) {
                    recordTypeSet.add(key);
                }
            });
        });

        // Get all predefined record types in order
        const predefinedTypes =
            COURSE_CONSTANTS.RECORDING.PREDEFINED_RECORD_TYPES;

        // Filter to only include record types that exist in the current page
        // and maintain the predefined order
        return predefinedTypes.filter((type) => recordTypeSet.has(type));
    }, [recordingsData?.dailyRecords]);

    // Sort daily records by date (oldest first)
    const sortedDailyRecords = useMemo(() => {
        const dailyRecords = recordingsData?.dailyRecords ?? [];
        return [...dailyRecords].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [recordingsData?.dailyRecords]);

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
     * formatNotes - Format notes for display
     * @param notes - The notes to format
     * @returns Formatted notes string or placeholder
     */
    const formatNotes = (notes: string | null): string => {
        if (!notes || notes.trim().length === 0) {
            return "No notes";
        }
        return notes;
    };

    /**
     * getRecordTypeData - Get record type data from daily record
     * @param record - The daily record
     * @param recordType - The record type to get
     * @returns Record type data or null
     */
    const getRecordTypeData = (
        record: DailyRecord,
        recordType: string
    ): { minutes: number; notes: string | null } | null => {
        const data = record[recordType];
        if (
            data &&
            typeof data === "object" &&
            data !== null &&
            "minutes" in data &&
            "notes" in data
        ) {
            return data as { minutes: number; notes: string | null };
        }
        return null;
    };

    return (
        <Card className="min-h-[300px] mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pb-4">
                <CardTitle className="flex items-center gap-2.5 text-lg sm:text-xl font-semibold">
                    <div className="p-1.5 bg-muted rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    Course Recordings
                </CardTitle>
                <Select
                    value={viewMode}
                    onValueChange={(value: "time" | "notes") =>
                        setViewMode(value)
                    }
                >
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <div className="flex items-center gap-2">
                            {viewMode === "time" ? (
                                <Clock className="h-4 w-4" />
                            ) : (
                                <FileText className="h-4 w-4" />
                            )}
                            <SelectValue />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="notes">Notes</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            {isLoading ? (
                <CardContent>
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="size-8 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            ) : sortedDailyRecords.length === 0 ? (
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
                <CardContent className="p-0 sm:p-6 overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block px-4 sm:px-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-2 hover:bg-transparent">
                                        <TableHead className="sticky left-0 bg-background z-10 min-w-[120px] sm:min-w-[140px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                            Date
                                        </TableHead>
                                        {availableRecordTypes.map(
                                            (recordType) => (
                                                <TableHead
                                                    key={recordType}
                                                    className="text-center min-w-[90px] sm:min-w-[110px] font-semibold text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm"
                                                >
                                                    {formatRecordType(
                                                        recordType
                                                    )}
                                                </TableHead>
                                            )
                                        )}
                                        {viewMode === "time" && (
                                            <TableHead className="text-center font-semibold min-w-[90px] sm:min-w-[110px] bg-muted/40 text-foreground h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm">
                                                Total
                                            </TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedDailyRecords.map((record, index) => {
                                        return (
                                            <TableRow
                                                key={record.date}
                                                className={cn(
                                                    "hover:bg-muted/30 transition-colors",
                                                    index ===
                                                        sortedDailyRecords.length -
                                                            1 && "border-b-0"
                                                )}
                                            >
                                                <TableCell className="font-medium sticky left-0 bg-background z-10 px-2 sm:px-4 py-2.5 sm:py-3.5 whitespace-nowrap">
                                                    <span className="text-xs sm:text-sm text-foreground">
                                                        {DatesUtils.formatDate(
                                                            record.date
                                                        )}
                                                    </span>
                                                </TableCell>
                                                {availableRecordTypes.map(
                                                    (recordType) => {
                                                        const recordTypeData =
                                                            getRecordTypeData(
                                                                record,
                                                                recordType
                                                            );
                                                        return (
                                                            <TableCell
                                                                key={recordType}
                                                                className={cn(
                                                                    "px-2 sm:px-4 py-2.5 sm:py-3.5 text-center",
                                                                    viewMode ===
                                                                        "notes" &&
                                                                        "max-w-[150px] sm:max-w-[200px]"
                                                                )}
                                                            >
                                                                {recordTypeData ? (
                                                                    viewMode ===
                                                                    "time" ? (
                                                                        <span className="text-xs sm:text-sm font-medium text-foreground">
                                                                            {formatMinutes(
                                                                                recordTypeData.minutes
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs sm:text-sm text-foreground line-clamp-2">
                                                                            {formatNotes(
                                                                                recordTypeData.notes
                                                                            )}
                                                                        </span>
                                                                    )
                                                                ) : (
                                                                    <span className="text-[10px] sm:text-xs text-muted-foreground/60 italic">
                                                                        N/A
                                                                    </span>
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                )}
                                                {viewMode === "time" && (
                                                    <TableCell className="font-semibold bg-muted/20 px-2 sm:px-4 py-2.5 sm:py-3.5 text-center">
                                                        <span className="text-xs sm:text-sm text-foreground">
                                                            {formatMinutes(
                                                                record.total
                                                            )}
                                                        </span>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            )}

            {sortedDailyRecords.length > 0 && totalPages > 0 && (
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
        </Card>
    );
};
