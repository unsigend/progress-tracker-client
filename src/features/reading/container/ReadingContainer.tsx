import { useState, useMemo } from "react";
import { DailyCard } from "@/features/reading/components/recordings/statistics/DailyCard";
import { WeeklyCard } from "@/features/reading/components/recordings/statistics/WeeklyCard";
import { CompletedSection } from "@/features/reading/components/user-books/CompletedSection";
import { InProgressSection } from "@/features/reading/components/user-books/InProgressSection";
import { FeatureBooksSection } from "@/features/reading/components/FeatureBooksSection";
import { QuickActionsCard } from "@/features/reading/components/QuickActionsCard";
import { useUserBooks } from "@/entities/reading/user-books/hooks/useUserBooks";
import { useToday } from "@/entities/statistics/reading/hooks/useToday";
import { useMonth } from "@/entities/statistics/reading/hooks/useMonth";
import { DatesUtils } from "@/lib/utils/dates";

/**
 * ReadingContainer - Container component for the reading page
 * Handles data fetching and state management
 * @returns ReadingHomeContainer component
 */
export const ReadingContainer = () => {
    // Weekly analysis state
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    // Get completed books
    const { data: completedBooks, isLoading: isLoadingCompletedBooks } =
        useUserBooks({
            field: "status",
            value: "COMPLETED",
            sort: "completedDate",
            order: "desc",
            page: 1,
            limit: 10,
        });

    // Get in-progress books
    const { data: inProgressBooks, isLoading: isLoadingInProgressBooks } =
        useUserBooks({
            field: "status",
            value: "IN_PROGRESS",
            sort: "startDate",
            order: "desc",
            page: 1,
            limit: 10,
        });

    // Get today's reading statistics
    const { data: todayRecordings, isLoading: isLoadingTodayRecordings } =
        useToday();

    // Get recordings data for needed months based on weekOffset
    const { data: monthlyRecordings, isLoading: isLoadingWeeklyRecordings } =
        useMonth(currentWeekOffset);

    // Calculate weekly analysis data from cached recordings
    const weeklyAnalysisData = useMemo(() => {
        // Filter recordings for the current week based on offset
        // Compare only date part (YYYY-MM-DD), not full ISO string
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

        // Transform to week data format
        const weekDataArray = DatesUtils.createWeekData(
            weekRecordings.map((rec) => ({
                date: rec.date,
                pages: rec.pages,
            })),
            currentWeekOffset
        );

        // Calculate stats
        const values = weekDataArray.map((day) => day.value);
        const totalPages = values.reduce((sum, value) => sum + value, 0);
        const nonZeroValues = values.filter((value) => value > 0);
        const dailyAvg =
            nonZeroValues.length > 0
                ? Math.round(totalPages / nonZeroValues.length)
                : 0;

        // Find best day
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

    /**
     * handlePreviousWeek - Handler for previous week navigation
     */
    const handlePreviousWeek = () => {
        setCurrentWeekOffset(currentWeekOffset - 1);
    };

    /**
     * handleNextWeek - Handler for next week navigation
     */
    const handleNextWeek = () => {
        // Don't allow future weeks
        if (currentWeekOffset < 0) {
            setCurrentWeekOffset(currentWeekOffset + 1);
        }
    };

    // Sample book cover URLs for the Featured Reads section
    const sampleBookCoverUrls = [
        "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81HqVRRwp3L._SY522_.jpg",
        "https://m.media-amazon.com/images/I/61Mw06x2XcL._SY522_.jpg",
        "https://books.google.com/books/content?id=cM8mDwAAQBAJ&printsec=frontcover&img=1&edge=curl&source=gbs_api&fife=w500-h750",
        "https://m.media-amazon.com/images/I/91hUer84PpL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81xkjj+FAfL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/71OMPF7vzmL._SY522_.jpg",
        "https://m.media-amazon.com/images/I/81HqVRRwp3L._SY522_.jpg",
        "https://m.media-amazon.com/images/I/61Mw06x2XcL._SY522_.jpg",
    ];

    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            {/* Advanced CSS Grid Layout */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Row 1: Daily Summary Card */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]">
                        <DailyCard
                            readingStatistics={todayRecordings ?? null}
                            isLoading={isLoadingTodayRecordings}
                        />
                    </div>
                </div>

                {/* Row 1: Quick Actions Card */}
                <div
                    className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-4 flex 
                items-start justify-center lg:justify-start"
                >
                    <div className="w-full h-[350px]">
                        <QuickActionsCard />
                    </div>
                </div>

                {/* Row 1: Weekly Analysis */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[350px]">
                        <WeeklyCard
                            isLoading={isLoadingWeeklyRecordings}
                            weekRange={weeklyAnalysisData.weekRange}
                            stats={weeklyAnalysisData.stats}
                            weekData={weeklyAnalysisData.weekData}
                            onPreviousWeek={handlePreviousWeek}
                            onNextWeek={handleNextWeek}
                            canGoNext={currentWeekOffset >= 0}
                        />
                    </div>
                </div>

                {/* Row 3: In Progress Reading */}
                <div className="col-span-12">
                    <InProgressSection
                        inProgressBooks={inProgressBooks?.userBooks || []}
                        isLoading={isLoadingInProgressBooks}
                    />
                </div>

                {/* Row 4: Completed Books */}
                <div className="col-span-12">
                    <CompletedSection
                        completedBooks={completedBooks?.userBooks || []}
                        isLoading={isLoadingCompletedBooks}
                    />
                </div>

                {/* Row 5: Feature Books */}
                <div className="col-span-12">
                    <FeatureBooksSection
                        coverImageUrls={sampleBookCoverUrls}
                        title="Featured Reads"
                        subtitle="Curated selection of our top recommendations."
                    />
                </div>
            </div>
        </div>
    );
};
