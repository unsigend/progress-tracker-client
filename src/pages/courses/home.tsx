import { PrivateCoursesCard } from "@/features/courses/components/courses/PrivateCoursesCard";
import { UserCoursesCompleted } from "@/features/courses/components/user-courses/UserCoursesCompleted";
import { UserCoursesInProgress } from "@/features/courses/components/user-courses/UserCoursesInProgress";

/**
 * CoursesHomePage - The page for the courses home
 * @returns CoursesHomePage component
 */
export const CoursesHomePage = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
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
