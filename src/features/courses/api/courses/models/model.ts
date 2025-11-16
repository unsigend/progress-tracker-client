/**
 * Course - Interface for a course
 */
export interface Course {
    id: string;
    name: string;
    description: string | null;
    source: string | null;
    isPublic: boolean;
    officialWebsiteUrl: string | null;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    categories?: string[];
}

/**
 * CourseCreate - Interface for creating a course
 */
export interface CourseCreate {
    name: string;
    description?: string;
    source?: string;
    isPublic?: boolean;
    officialWebsiteUrl?: string;
    categories?: string[];
}

/**
 * CourseUpdate - Interface for updating a course
 */
export interface CourseUpdate {
    name?: string;
    description?: string;
    source?: string;
    isPublic?: boolean;
    officialWebsiteUrl?: string;
    categories?: string[];
}

/**
 * Courses - Interface for a list of courses
 */
export interface Courses {
    courses: Course[];
    totalCount: number;
}

/**
 * CoursesQuery - Interface for a query to get a list of courses
 */
export interface CoursesQuery {
    field?: string;
    value?: string;
    sort?: string;
    order?: "asc" | "desc";
    limit?: number;
    page?: number;
}
