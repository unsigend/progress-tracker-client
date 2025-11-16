/**
 * TextUtils - Utility functions for text manipulation
 */
export const TextUtils = {
    /**
     * truncateTitle - Truncate title at colon if present
     * @param title - The title to truncate
     * @returns Truncated title
     */
    truncateTitle: (title: string): string => {
        return title.includes(":") ? title.split(":")[0] : title;
    },

    /**
     * formatFileSize - Format file size in bytes to MB
     * @param bytes - File size in bytes
     * @returns Formatted file size string
     */
    formatFileSize: (bytes: number): string => {
        return (bytes / 1024 / 1024).toFixed(2);
    },

    /**
     * getInitial - Get first character of string or default
     * @param text - The text to get initial from
     * @param defaultChar - Default character if text is empty
     * @returns First character or default
     */
    getInitial: (text?: string | null, defaultChar: string = "B"): string => {
        return text && text !== "Book cover" ? text.charAt(0) : defaultChar;
    },

    /**
     * formatDurationShort - Format duration to short string (e.g., "30m", "2.5h")
     * @param minutes - Duration in minutes
     * @returns Short formatted duration string
     */
    formatDurationShort: (minutes: number): string => {
        if (minutes < 60) {
            return `${minutes}m`;
        }
        return `${(minutes / 60).toFixed(1)}h`;
    },
};

