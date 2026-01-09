import { PrivateCoursesCard } from "@/features/courses/components/courses/PrivateCoursesCard";
import { UserCoursesCompleted } from "@/features/courses/components/user-courses/UserCoursesCompleted";
import { UserCoursesInProgress } from "@/features/courses/components/user-courses/UserCoursesInProgress";
import { QuickActionsCard } from "@/components/common/QuickActionsCard";
import { UniversityList } from "@/features/courses/components/UniversityList";
import { Plus, GraduationCap } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * CoursesHomePage - The page for the courses home
 * @returns CoursesHomePage component
 */
export const CoursesHomePage = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Quick Actions and University Courses */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]">
                        <QuickActionsCard
                            primaryActionUrl={ROUTES_CONSTANTS.DASHBOARD()
                                .COURSES()
                                .RECORDINGS()
                                .NEW()}
                            primaryActionLabel="Add Recording"
                            primaryActionIcon={Plus}
                            secondaryActionUrl={ROUTES_CONSTANTS.DASHBOARD()
                                .COURSES()
                                .LIST()
                                .HOME()}
                            secondaryActionLabel="Browse Courses"
                            secondaryActionIcon={GraduationCap}
                        />
                    </div>
                </div>

                {/* University Courses */}
                <div className="col-span-12 lg:col-span-8 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-auto lg:h-[350px]">
                        <UniversityList />
                    </div>
                </div>

                {/* In Progress Courses */}
                <div className="col-span-12">
                    <UserCoursesInProgress />
                </div>

                {/* Completed Courses */}
                <div className="col-span-12">
                    <UserCoursesCompleted />
                </div>

                {/* Private Courses */}
                <div className="col-span-12">
                    <PrivateCoursesCard />
                </div>
            </div>
        </div>
    );
};
