/**
 * DevProgressData - Interface for development progress data
 */
export interface DevProgressData {
    id: string;
    title: string;
    description: string;
    date?: string;
    status: "completed" | "coming-soon";
}

/**
 * devProgressData - The data for the development progress
 */
export const devProgressData: DevProgressData[] = [
    {
        id: "role-based-access-control",
        title: "Role-based Access Control (RBAC)",
        description:
            "Implement comprehensive RBAC system to protect sensitive endpoints and resources. Includes integrated admin panel for user management, system monitoring, and administrative controls.",
        status: "coming-soon",
    },
    {
        id: "rebuild-backend-hexagonal-architecture",
        title: "Rebuild Backend with Hexagonal Architecture",
        description:
            "Refactor the backend using Hexagonal Architecture with Domain Driven Design (DDD) principles to decouple the modules dependencies and improve the scalability and maintainability.",
        status: "completed",
        date: "October 28, 2025",
    },
    {
        id: "deployment-e2e-testing",
        title: "Deployment",
        description:
            "Deploy the application across multiple platforms into production and apply end-to-end testing.",
        status: "completed",
        date: "October 15, 2025",
    },
    {
        id: "email-notifications",
        title: "Email Notification System",
        description:
            "Secure email-based authentication with verification codes for password reset, account verification, and important notifications with real-time delivery.",
        status: "completed",
        date: "October 14, 2025",
    },
    {
        id: "image-compression",
        title: "Image Compression",
        description:
            "Automatically compress and optimize images to reduce file size and improve loading speed with minimal quality loss.",
        status: "completed",
        date: "October 13, 2025",
    },
    {
        id: "reading-progress-tracking",
        title: "Reading Progress Tracking",
        description:
            "Track daily and monthly reading progress with pages and minutes read. Monitor completed and in-progress books with detailed page-based analytics.",
        status: "completed",
        date: "October 10, 2025",
    },
    {
        id: "aws-s3-cloud-image-storage",
        title: "Amazon AWS S3 Cloud Image Storage",
        description:
            "Secure cloud storage with AWS S3 integration for user-uploaded images and data assets.",
        status: "completed",
        date: "September 29, 2025",
    },
    {
        id: "books-library",
        title: "Books Library",
        description:
            "Comprehensive book catalog with advanced search, pagination, and persistent search history.",
        status: "completed",
        date: "September 28, 2025",
    },
    {
        id: "oauth-auth",
        title: "OAuth Authentication System",
        description:
            "Seamless authentication with GitHub and Google OAuth integration for quick and secure user access.",
        status: "completed",
        date: "September 25, 2025",
    },
];
