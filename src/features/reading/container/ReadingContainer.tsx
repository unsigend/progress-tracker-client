import { useState, useMemo } from "react";
import { DailyCard } from "@/features/reading/components/recordings/statistics/DailyCard";
import { WeeklyCard } from "@/features/reading/components/recordings/statistics/WeeklyCard";
import { CompletedSection } from "@/features/reading/components/user-books/CompletedSection";
import { InProgressSection } from "@/features/reading/components/user-books/InProgressSection";
import { FeatureBooksSection } from "@/features/reading/components/FeatureBooksSection";
import { QuickActionsCard } from "@/features/reading/components/QuickActionsCard";
import { useUserBooks } from "@/entities/reading/user-books/hooks/useUserBooks";

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

    // TODO: Implement useRecordingsStatistics hook for today's recordings
    // const { data: todayRecordings, isLoading: isLoadingTodayRecordings } = useRecordingsStatistics({
    //     startDate: new Date().toISOString().split("T")[0],
    //     dateLimit: 1,
    // });

    // TODO: Implement useRecordingsStatistics hook for weekly recordings
    // const { data: weeklyRecordings, isLoading: isLoadingWeeklyRecordings } = useRecordingsStatistics({
    //     startDate: getWeekStartDate(currentWeekOffset),
    //     dateLimit: 7,
    // });

    // Calculate totals for completed books
    const completedBooksTotalCount = completedBooks?.totalCount || 0;
    const completedBooksTotalPages =
        completedBooks?.userBooks
            .filter((userBook) => userBook.book !== null)
            .reduce((sum, userBook) => sum + (userBook.book?.pages || 0), 0) ||
        0;

    const todayRecordings: {
        recordings?: Array<{
            date: string;
            pages: number;
            minutes: number;
        }>;
    } | null = null;
    const isLoadingTodayRecordings = false;

    const weeklyRecordings: {
        recordings?: Array<{
            date: string;
            pages: number;
        }>;
    } | null = null;
    const isLoadingWeeklyRecordings = false;

    // TODO: Implement date utility functions
    // Calculate weekly analysis data
    const weeklyAnalysisData = useMemo(() => {
        // Placeholder implementation
        const weekData: Array<{ key: string; value: number; date: string }> =
            [];
        const stats = { totalPages: 0, dailyAvg: 0, bestDay: "N/A" };
        const weekRange = ""; // TODO: Format week range

        return {
            weekData,
            stats,
            weekRange,
        };
    }, [weeklyRecordings, currentWeekOffset]);

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

    /**
     * handleAddBookClick - Handler for add book button click
     */
    const handleAddBookClick = () => {
        // TODO: Navigate to book list or add book page
    };

    /**
     * handleAddRecordingClick - Handler for add recording button click
     */
    const handleAddRecordingClick = () => {
        // TODO: Navigate to new recording page
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
                            readingStatistics={todayRecordings}
                            isLoading={isLoadingTodayRecordings}
                            onAddRecordingClick={handleAddRecordingClick}
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
                        onAddBookClick={handleAddBookClick}
                    />
                </div>

                {/* Row 4: Completed Books */}
                <div className="col-span-12">
                    <CompletedSection
                        completedBooks={completedBooks?.userBooks || []}
                        totalCount={completedBooksTotalCount}
                        totalPages={completedBooksTotalPages}
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
