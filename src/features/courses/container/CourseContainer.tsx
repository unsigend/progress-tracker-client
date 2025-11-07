import { useMyCourses } from "@/entities/course/courses/hooks/useMyCourses";
import { PrivateCoursesCard } from "../components/courses/PrivateCoursesCard";
import { useNavigate } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * CourseContainer - Container component for the courses page
 * @returns CourseContainer component
 */
export const CourseContainer = () => {
    const navigate = useNavigate();
    // get my private courses
    const { data: courses, isLoading } = useMyCourses(true);

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
                    <PrivateCoursesCard
                        courses={courses?.courses || []}
                        isLoading={isLoading}
                        onMarkAsPublic={() => {}}
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

                {/* Row 3: TODO */}
                <div className="col-span-12"></div>

                {/* Row 4: TODO */}
                <div className="col-span-12"></div>
            </div>
        </div>
    );
};
