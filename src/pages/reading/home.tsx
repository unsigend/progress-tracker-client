import { DailyCard } from "@/features/reading/components/statistics/DailyCard";
import { WeeklyCard } from "@/features/reading/components/statistics/WeeklyCard";
import { UserBooksCompleted } from "@/features/reading/components/user-books/UserBooksCompleted";
import { UserBooksInProgress } from "@/features/reading/components/user-books/UserBooksInProgress";
import { FeaturedBooks } from "@/features/reading/components/FeaturedBooks";
import { QuickActionsCard } from "@/components/common/QuickActionsCard";
import { Plus, BookOpen } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * ReadingHomePage - The page for the reading home
 * @returns ReadingHomePage component
 */
export const ReadingHomePage = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Daily Summary */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]">
                        <DailyCard />
                    </div>
                </div>

                {/* Quick Actions */}
                <div
                    className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-4 flex 
                items-start justify-center lg:justify-start"
                >
                    <div className="w-full h-[350px]">
                        <QuickActionsCard
                            primaryActionUrl={ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .RECORDINGS()
                                .NEW()}
                            primaryActionLabel="Add Recording"
                            primaryActionIcon={Plus}
                            secondaryActionUrl={ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS()
                                .LIST()}
                            secondaryActionLabel="Track More Books"
                            secondaryActionIcon={BookOpen}
                        />
                    </div>
                </div>

                {/* Weekly Analysis */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[350px]">
                        <WeeklyCard />
                    </div>
                </div>

                {/* In Progress Reading */}
                <div className="col-span-12">
                    <UserBooksInProgress />
                </div>

                {/* Completed Books */}
                <div className="col-span-12">
                    <UserBooksCompleted />
                </div>

                {/* Featured Books */}
                <div className="col-span-12">
                    <FeaturedBooks />
                </div>
            </div>
        </div>
    );
};
