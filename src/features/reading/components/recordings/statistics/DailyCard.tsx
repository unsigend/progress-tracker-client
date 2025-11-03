import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * Recording - Interface for recording data
 */
interface Recording {
    date: string;
    pages: number;
    minutes: number;
}

/**
 * DailySummaryData - Interface for daily summary data
 */
interface DailySummaryData {
    recordings?: Recording[];
}

/**
 * DailyCardProps - Interface for DailyCard component props
 */
interface DailyCardProps {
    readingStatistics: DailySummaryData | null;
    isLoading?: boolean;
    onAddRecordingClick?: () => void;
}

/**
 * formatTime - Format minutes into hours or minutes string
 * @param minutes - Total minutes
 * @returns Object with formatted value and unit
 */
const formatTime = (minutes: number): { value: string; unit: string } => {
    if (minutes === 0) {
        return { value: "0", unit: "minutes" };
    }
    if (minutes < 60) {
        return { value: minutes.toString(), unit: "minutes" };
    }
    const hours = minutes / 60;
    return {
        value: hours.toFixed(1),
        unit: hours === 1 ? "hour" : "hours",
    };
};

/**
 * DailyCard - Pure UI component for displaying daily reading summary
 * @param props - The props for the DailyCard component
 * @param props.readingStatistics - The daily reading statistics
 * @param props.isLoading - Whether the data is loading
 * @param props.onAddRecordingClick - Handler for add recording button click
 * @returns DailyCard component
 */
export const DailyCard = ({
    readingStatistics,
    isLoading = false,
    onAddRecordingClick,
}: DailyCardProps) => {
    const totalPages =
        readingStatistics?.recordings?.reduce(
            (sum, recording) => sum + recording.pages,
            0
        ) ?? 0;

    const totalMinutes =
        readingStatistics?.recordings?.reduce(
            (sum, recording) => sum + recording.minutes,
            0
        ) ?? 0;

    const timeFormatted = formatTime(totalMinutes);
    const todayDate = new Date()
        .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        .toUpperCase();

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    Daily Summary
                    {onAddRecordingClick ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={onAddRecordingClick}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Link
                            to={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Date */}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {todayDate}
                            </p>
                        </div>

                        {/* Pages Read */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Pages Read
                            </p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {totalPages}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    pages
                                </p>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-border"></div>

                        {/* Time Spent */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Time Spent
                            </p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {timeFormatted.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {timeFormatted.unit}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
