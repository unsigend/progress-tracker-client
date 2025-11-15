import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useUserCourses } from "@/entities/course/user-courses/hooks/useUserCourses";
import { useCourseRecordings } from "@/entities/course/recordings/hooks/useRecordings";
import { useMarkAsComplete } from "@/entities/course/user-courses/hooks/useMarkAsComplete";
import { InProgressCoursesList } from "@/features/courses/components/user-courses/InProgressCoursesList";
import type { UserCourseWithCourse } from "@/entities/course/user-courses/model/model";
import type { CourseRecording } from "@/entities/course/recordings/models/model";

/**
 * RecordingCategoryData - Interface for categorized recording data
 */
interface RecordingCategoryData {
    key: string;
    value: number;
}

/**
 * UserCourseWithRecordings - Interface for user course with categorized recordings
 */
interface UserCourseWithRecordings {
    userCourse: UserCourseWithCourse;
    recordingsData: RecordingCategoryData[];
    isLoadingRecordings: boolean;
}

/**
 * categorizeRecordingsByType - Categorize recordings by type and calculate total minutes
 * @param recordings - Array of course recordings
 * @returns Array of categorized recording data
 */
const categorizeRecordingsByType = (
    recordings: CourseRecording[]
): RecordingCategoryData[] => {
    const categoryMap = new Map<string, number>();

    recordings.forEach((recording) => {
        const type = recording.recordType.toUpperCase();
        const currentMinutes = categoryMap.get(type) || 0;
        categoryMap.set(type, currentMinutes + recording.minutes);
    });

    // Convert to array and format for pie chart
    return Array.from(categoryMap.entries())
        .map(([key, value]) => ({
            key: key.charAt(0) + key.slice(1).toLowerCase(),
            value,
        }))
        .sort((a, b) => b.value - a.value); // Sort by value descending
};

/**
 * UserCoursesInProgressListContainer - Container component for in-progress courses list with recordings
 * @returns UserCoursesInProgressListContainer component
 */
export const UserCoursesInProgressListContainer = () => {
    const navigate = useNavigate();
    const { markAsComplete } = useMarkAsComplete();

    // Fetch in-progress courses (limit to 3)
    const { data: inProgressCoursesData, isLoading: isLoadingCourses } =
        useUserCourses({
            field: "status",
            value: "IN_PROGRESS",
            sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
            order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
            page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
            limit: COURSE_CONSTANTS.USER_COURSE.MAXIMUM_TRACKED_COURSES,
        });

    // Get valid courses (already limited by MAXIMUM_TRACKED_COURSES in the query)
    const displayCourses =
        inProgressCoursesData?.userCourses.filter(
            (userCourse) => userCourse.course !== null
        ) || [];

    // Fetch recordings for each course (only for courses that exist)
    const recordingsQuery1 = useCourseRecordings(displayCourses[0]?.id || "");
    const recordingsQuery2 = useCourseRecordings(displayCourses[1]?.id || "");
    const recordingsQuery3 = useCourseRecordings(displayCourses[2]?.id || "");

    const recordingsQueries = [
        recordingsQuery1,
        recordingsQuery2,
        recordingsQuery3,
    ];

    // Process courses with their recordings data
    const coursesWithRecordings: UserCourseWithRecordings[] =
        displayCourses.map((userCourse, index) => {
            const recordingsQuery = recordingsQueries[index];
            const recordings = recordingsQuery.data?.recordings || [];
            const recordingsData = categorizeRecordingsByType(recordings);

            return {
                userCourse,
                recordingsData,
                isLoadingRecordings: recordingsQuery.isLoading,
            };
        });

    // Check if any recordings are loading (only check queries for existing courses)
    const isLoadingRecordings = recordingsQueries
        .slice(0, displayCourses.length)
        .some((query) => query.isLoading);

    /**
     * handleNavigate - Handler for navigating to course detail
     * @param userCourseId - The user course ID
     */
    const handleNavigate = (userCourseId: string) => {
        navigate(
            ROUTES_CONSTANTS.DASHBOARD()
                .COURSES()
                .USER_COURSES()
                .DETAIL(userCourseId)
        );
    };

    /**
     * handleMarkAsComplete - Handler for marking a course as complete
     * @param userCourseId - The user course ID
     */
    const handleMarkAsComplete = async (userCourseId: string) => {
        await markAsComplete(userCourseId);
        toast.success("Course marked as complete");
    };

    return (
        <InProgressCoursesList
            coursesWithRecordings={coursesWithRecordings}
            isLoading={isLoadingCourses || isLoadingRecordings}
            onNavigate={handleNavigate}
            onMarkAsComplete={handleMarkAsComplete}
        />
    );
};
