import { ExploreBooksLibraryCard } from "@/features/dashboard/components/home/ExploreBooksLibraryCard";
import { FindNewCoursesCard } from "@/features/dashboard/components/home/FindNewCoursesCard";

/**
 * DashboardHomePage - The page for the dashboard home
 * @returns DashboardHomePage component
 */
export const DashboardHomePage = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Explore Books Library */}
                <div className="col-span-12 lg:col-span-6 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[280px]">
                        <ExploreBooksLibraryCard />
                    </div>
                </div>

                {/* Find New Courses */}
                <div className="col-span-12 lg:col-span-6 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[280px]">
                        <FindNewCoursesCard />
                    </div>
                </div>
            </div>
        </div>
    );
};
