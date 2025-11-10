import { useMyCourses } from "@/entities/course/courses/hooks/useMyCourses";
import { PrivateCoursesCard } from "../components/courses/PrivateCoursesCard";
import { useNavigate } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useMarkAsPublic } from "@/entities/course/courses/hooks/useMarkAsPublic";
import { toast } from "sonner";
import { InProgressCoursesSection } from "../components/user-courses/InProgressCoursesSection";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useUserCourses } from "@/entities/course/user-courses/hooks/useUserCourses";
import { CompletedCoursesSection } from "../components/user-courses/CompletedCoursesSection";
import { useMarkAsComplete } from "@/entities/course/user-courses/hooks/useMarkAsComplete";

/**
 * CourseContainer - Container component for the courses page
 * @returns CourseContainer component
 */
export const CourseContainer = () => {
    const navigate = useNavigate();
    // get my private courses
    const { data: courses, isLoading } = useMyCourses(true);
    const { markAsPublic } = useMarkAsPublic();
    const { markAsComplete } = useMarkAsComplete();

    // get in progress courses
    const { data: inProgressCourses, isLoading: isLoadingInProgressCourses } =
        useUserCourses({
            field: "status",
            value: "IN_PROGRESS",
            sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
            order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
            page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
            limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
        });

    // get completed courses
    const { data: completedCourses, isLoading: isLoadingCompletedCourses } =
        useUserCourses({
            field: "status",
            value: "COMPLETED",
            sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
            order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
            page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
            limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
        });

    // mark as public
    const handleMarkAsPublic = async (id: string) => {
        await markAsPublic(id);
        toast.success("Course marked as public");
    };

    // mark as complete
    const handleMarkAsComplete = async (id: string) => {
        await markAsComplete(id);
        toast.success("Course marked as complete");
    };
    return (
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-min">
                {/* Row 1: TODO */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex items-start justify-center lg:justify-start">
                    <div className="w-full h-[350px]"></div>
                </div>

                {/* Row 1: TODO */}
                <div
                    className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-4 flex 
                items-start justify-center lg:justify-start"
                >
                    <div className="w-full h-[350px]"></div>
                </div>

                {/* Row 1: TODO */}
                <div className="col-span-12 lg:col-span-4 flex items-start justify-center lg:justify-end">
                    <div className="w-full h-[350px]"></div>
                </div>

                {/* Row 2: In Progress Reading */}
                <div className="col-span-12">
                    <InProgressCoursesSection
                        inProgressCourses={inProgressCourses?.userCourses || []}
                        isLoading={isLoadingInProgressCourses}
                        onNavigate={(id) => {
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD()
                                    .COURSES()
                                    .USER_COURSES()
                                    .DETAIL(id)
                            );
                        }}
                        onMarkAsComplete={handleMarkAsComplete}
                    />
                </div>

                {/* Row 3: Completed Courses */}
                <div className="col-span-12">
                    <CompletedCoursesSection
                        completedCourses={completedCourses?.userCourses || []}
                        isLoading={isLoadingCompletedCourses}
                    />
                </div>

                {/* Row 4: Private Courses */}
                <div className="col-span-12">
                    <PrivateCoursesCard
                        courses={courses?.courses || []}
                        isLoading={isLoading}
                        onMarkAsPublic={handleMarkAsPublic}
                        onNavigate={(id) => {
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD()
                                    .COURSES()
                                    .LIST()
                                    .DETAIL(id)
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
