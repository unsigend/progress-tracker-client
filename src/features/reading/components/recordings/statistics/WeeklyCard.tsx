import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";

/**
 * WeekData - Interface for week data item
 */
interface WeekData {
    key: string;
    value: number;
    date: string;
}

/**
 * WeeklyStats - Interface for weekly statistics
 */
interface WeeklyStats {
    totalPages: number;
    dailyAvg: number;
    bestDay: string;
}

/**
 * WeeklyCardProps - Interface for WeeklyCard component props
 */
interface WeeklyCardProps {
    isLoading?: boolean;
    weekRange: string;
    stats: WeeklyStats;
    weekData: WeekData[];
    onPreviousWeek: () => void;
    onNextWeek: () => void;
    canGoNext: boolean;
}

/**
 * WeeklyCard - Pure UI component for displaying weekly reading summary
 * @param props - The props for the WeeklyCard component
 * @param props.isLoading - Whether the data is loading
 * @param props.weekRange - The week range string
 * @param props.stats - Weekly statistics
 * @param props.weekData - Array of week data points
 * @param props.onPreviousWeek - Handler for previous week navigation
 * @param props.onNextWeek - Handler for next week navigation
 * @param props.canGoNext - Whether next week navigation is enabled
 * @returns WeeklyCard component
 */
export const WeeklyCard = ({
    isLoading = false,
    weekRange,
    stats,
    weekData,
    onPreviousWeek,
    onNextWeek,
    canGoNext,
}: WeeklyCardProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold mb-0">
                            Weekly Analysis
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            {weekRange}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t">
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Pages
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {stats.totalPages}
                        </div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Daily Avg
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {stats.dailyAvg}
                        </div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Best Day
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {stats.bestDay}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-1 sm:p-2 flex items-center justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {/* Left Arrow */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onPreviousWeek}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Bar Chart */}
                        <BarChart
                            className="h-38"
                            chartData={weekData}
                            color="rgb(56, 65, 81)"
                            label="Pages"
                        />

                        {/* Right Arrow */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onNextWeek}
                            disabled={canGoNext}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
