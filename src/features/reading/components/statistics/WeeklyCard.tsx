import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import { useMonth } from "@/features/reading/api";
import { DatesUtils } from "@/lib/utils/dates";

/**
 * WeeklyCard - Smart component for displaying weekly reading statistics
 * Handles its own data fetching and week navigation
 * @returns WeeklyCard component
 */
export const WeeklyCard = () => {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    // Fetch monthly recordings based on week offset
    const { data: monthlyRecordings, isLoading } = useMonth(currentWeekOffset);

    // Calculate weekly analysis data
    const weeklyData = useMemo(() => {
        const weekStart =
            DatesUtils.getWeekStartDate(currentWeekOffset).split("T")[0];
        const weekEnd =
            DatesUtils.getWeekEndDate(currentWeekOffset).split("T")[0];
        const weekRecordings = (monthlyRecordings?.recordings || []).filter(
            (rec) => {
                const recDate = rec.date.split("T")[0];
                return recDate >= weekStart && recDate <= weekEnd;
            }
        );

        const weekDataArray = DatesUtils.createWeekData(
            weekRecordings.map((rec) => ({
                date: rec.date,
                pages: rec.pages,
            })),
            currentWeekOffset
        );

        const values = weekDataArray.map((day) => day.value);
        const totalPages = values.reduce((sum, value) => sum + value, 0);
        const nonZeroValues = values.filter((value) => value > 0);
        const dailyAvg =
            nonZeroValues.length > 0
                ? Math.round(totalPages / nonZeroValues.length)
                : 0;

        const bestDayData = weekDataArray.reduce((best, current) =>
            current.value > best.value ? current : best
        );
        const bestDay = bestDayData.value > 0 ? bestDayData.key : "N/A";

        return {
            weekData: weekDataArray,
            stats: { totalPages, dailyAvg, bestDay },
            weekRange: DatesUtils.formatWeekRange(currentWeekOffset),
        };
    }, [monthlyRecordings, currentWeekOffset]);

    const handlePreviousWeek = () => {
        setCurrentWeekOffset(currentWeekOffset - 1);
    };

    const handleNextWeek = () => {
        if (currentWeekOffset < 0) {
            setCurrentWeekOffset(currentWeekOffset + 1);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold mb-0">
                            Weekly Analysis
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            {weeklyData.weekRange}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t">
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Pages
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {weeklyData.stats.totalPages}
                        </div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Daily Avg
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {weeklyData.stats.dailyAvg}
                        </div>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-xs text-muted-foreground">
                            Best Day
                        </div>
                        <div className="text-lg sm:text-2xl font-bold text-foreground">
                            {weeklyData.stats.bestDay}
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
                            onClick={handlePreviousWeek}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Bar Chart */}
                        <BarChart
                            className="h-38"
                            chartData={weeklyData.weekData}
                            color="rgb(56, 65, 81)"
                            label="Pages"
                        />

                        {/* Right Arrow */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleNextWeek}
                            disabled={currentWeekOffset >= 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
