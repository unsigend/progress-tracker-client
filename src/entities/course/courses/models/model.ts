/**
 * ICourse - Interface for a course
 */
export interface ICourse {
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
 * ICourseCreate - Interface for creating a course
 */
export interface ICourseCreate {
    name: string;
    description?: string;
    source?: string;
    isPublic?: boolean;
    officialWebsiteUrl?: string;
    categories?: string[];
}

/**
 * ICourseUpdate - Interface for updating a course
 */
export interface ICourseUpdate {
    name?: string;
    description?: string;
    source?: string;
    isPublic?: boolean;
    officialWebsiteUrl?: string;
    categories?: string[];
}

/**
 * ICourses - Interface for a list of courses
 */
export interface ICourses {
    courses: ICourse[];
    totalCount: number;
}

/**
 * ICoursesQuery - Interface for a query to get a list of courses
 */
export interface ICoursesQuery {
    field?: string;
    value?: string;
    sort?: string;
    order?: "asc" | "desc";
    limit?: number;
    page?: number;
}
