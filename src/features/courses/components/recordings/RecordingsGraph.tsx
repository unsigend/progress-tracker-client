import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { PieChart } from "@/components/charts/PieChart";
import { useCourseRecordingDetail } from "@/features/courses/api/statistics/hooks/useCourseRecordingDetail";
import { TextUtils } from "@/lib/utils/text";

/**
 * RecordingCategoryData - Interface for categorized recording data
 */
interface RecordingCategoryData {
    key: string;
    value: number;
}

/**
 * formatRecordType - Format record type for display
 * @param recordType - The record type to format
 * @returns Formatted record type string
 */
const formatRecordType = (recordType: string): string => {
    return recordType.charAt(0) + recordType.slice(1).toLowerCase();
};

/**
 * categorizeRecordingsByType - Categorize recordings by type from minutesByType
 */
const categorizeRecordingsByType = (
    minutesByType: Record<string, number>
): RecordingCategoryData[] => {
    return Object.entries(minutesByType)
        .map(([key, value]) => ({
            key: formatRecordType(key),
            value,
        }))
        .sort((a, b) => b.value - a.value);
};

/**
 * Get legend color by index
 */
const getLegendColor = (index: number): string => {
    const colors = [
        "#3b82f6", // Blue
        "#10b981", // Green
        "#ef4444", // Red
        "#f59e0b", // Yellow
        "#8b5cf6", // Purple
        "#06b6d4", // Cyan
        "#f97316", // Orange
        "#ec4899", // Pink
        "#14b8a6", // Teal
        "#84cc16", // Lime
    ];
    return colors[index % colors.length];
};

/**
 * RecordingsGraphProps - Interface for RecordingsGraph component props
 */
interface RecordingsGraphProps {
    userCourseId: string;
}

/**
 * RecordingsGraph - Component for displaying course recordings statistics with pie chart
 * Handles its own data fetching for recordings
 * @param props - The props for the RecordingsGraph component
 * @param props.userCourseId - The user course ID to fetch recordings for
 * @returns RecordingsGraph component
 */
export const RecordingsGraph = ({ userCourseId }: RecordingsGraphProps) => {
    const { data: statisticsData, isLoading } =
        useCourseRecordingDetail(userCourseId);

    const categorizedData = useMemo(() => {
        if (!statisticsData?.minutesByType) {
            return [];
        }
        return categorizeRecordingsByType(statisticsData.minutesByType);
    }, [statisticsData?.minutesByType]);

    const hasRecordings = categorizedData.length > 0;

    const totalMinutes = statisticsData?.totalMinutes ?? 0;
    const totalTimeFormatted = TextUtils.formatDurationShort(totalMinutes);

    return (
        <div className="flex items-center justify-center p-2.5 bg-muted/10 w-full lg:w-[250px] h-full min-h-[200px] lg:min-h-[250px]">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-4">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                        Loading...
                    </p>
                </div>
            ) : hasRecordings ? (
                <div className="flex flex-col items-center w-full gap-1.5">
                    {/* Time Spent Header - Compact */}
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                            Time Spent
                        </p>
                        <p className="text-2xl font-bold text-foreground leading-tight">
                            {totalTimeFormatted}
                        </p>
                    </div>

                    {/* Pie Chart - Slightly smaller */}
                    <div className="w-full max-w-[150px] -my-1">
                        <PieChart
                            data={categorizedData.map((item, index) => ({
                                ...item,
                                fill: getLegendColor(index),
                            }))}
                            className="w-full aspect-square"
                            showTooltip={true}
                            innerRadius={32}
                            outerRadius={58}
                            showLegend={false}
                        />
                    </div>

                    {/* Legend - Compact */}
                    <div className="flex items-center justify-center gap-1.5 flex-wrap text-[10px]">
                        {categorizedData.map((item, index) => (
                            <div
                                key={item.key}
                                className="flex items-center gap-1"
                            >
                                <div
                                    className="h-1.5 w-1.5 shrink-0 rounded-[2px]"
                                    style={{
                                        backgroundColor: getLegendColor(index),
                                    }}
                                />
                                <span className="text-muted-foreground font-semibold">
                                    {item.key}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-5 text-center">
                    <div className="rounded-full bg-muted p-2 mb-1">
                        <Loader2 className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">
                        No recordings yet
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                        Start tracking
                    </p>
                </div>
            )}
        </div>
    );
};
