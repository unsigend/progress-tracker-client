/**
 * DatesUtils - Utility functions for dates
 */
export const DatesUtils = {
    /**
     * formatDuration - Format minutes into hours or minutes string
     * @param minutes - Total minutes
     * @returns Object with formatted value and unit
     */
    formatDuration: (minutes: number): { value: string; unit: string } => {
        if (minutes === 0) {
            return { value: "0", unit: "minutes" };
        }
        if (minutes < 60) {
            return { value: minutes.toString(), unit: "minutes" };
        }
        const hours = minutes / 60;
        return {
            value: hours.toFixed(1),
            unit: hours === 1 ? "hour" : "hours",
        };
    },

    /**
     * formatDate - Format date string
     * @param date - Date to format
     * @returns Formatted date string
     */
    formatDate: (date: Date | string): string => {
        let dateObj: Date;
        if (typeof date === "string") {
            const dateParts = date.split("T")[0];
            const [year, month, day] = dateParts.split("-").map(Number);
            dateObj = new Date(year, month - 1, day);
        } else {
            dateObj = date;
        }
        return dateObj.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    },

    /**
     * getWeekStartDate - Get the start date of a week (Monday) with offset
     * @param weekOffset - Week offset from current week (0 = current week, -1 = previous week)
     * @returns ISO date string for the Monday of the week
     */
    getWeekStartDate: (weekOffset: number = 0): string => {
        const now = new Date();
        const currentDay = now.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() + mondayOffset + weekOffset * 7);
        weekStart.setHours(0, 0, 0, 0);
        return weekStart.toISOString();
    },

    /**
     * getWeekEndDate - Get the end date of a week (Sunday) with offset
     * @param weekOffset - Week offset from current week
     * @returns ISO date string for the Sunday of the week
     */
    getWeekEndDate: (weekOffset: number = 0): string => {
        const now = new Date();
        const currentDay = now.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() + mondayOffset + weekOffset * 7);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        return weekEnd.toISOString();
    },

    /**
     * getMonthRange - Get start and end dates for one month (current month with buffer)
     * @param monthOffset - Month offset from current month (0 = current month)
     * @returns Object with startDate and endDate as ISO strings
     */
    getMonthRange: (monthOffset: number = 0) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + monthOffset;

        const startDate = new Date(year, month, 1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(year, month + 1, 0);
        endDate.setHours(23, 59, 59, 999);

        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };
    },

    /**
     * formatWeekRange - Format week range as string
     * @param weekOffset - Week offset from current week
     * @returns Formatted week range string (e.g., "Nov 4 - Nov 10, 2025")
     */
    formatWeekRange: (weekOffset: number = 0): string => {
        const now = new Date();
        const currentDay = now.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() + mondayOffset + weekOffset * 7);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const startStr = weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        const endStr = weekEnd.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        return `${startStr} - ${endStr}`;
    },

    /**
     * createWeekData - Create week data structure with all 7 days (fills blanks with 0)
     * @param recordings - Array of recordings
     * @param weekOffset - Week offset from current week
     * @returns Array of week data with key (day name), value (pages), and date
     */
    createWeekData: (
        recordings: Array<{ date: string; pages: number }>,
        weekOffset: number = 0
    ): Array<{ key: string; value: number; date: string }> => {
        const now = new Date();
        const currentDay = now.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() + mondayOffset + weekOffset * 7);
        weekStart.setHours(0, 0, 0, 0);
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        // Create a map of date -> pages for quick lookup
        const recordingsMap = new Map<string, number>();
        recordings.forEach((recording) => {
            const dateStr = recording.date.split("T")[0];
            recordingsMap.set(
                dateStr,
                (recordingsMap.get(dateStr) || 0) + recording.pages
            );
        });

        // Generate all 7 days of the week
        return Array.from({ length: 7 }, (_, i) => {
            const currentDate = new Date(weekStart);
            currentDate.setDate(weekStart.getDate() + i);
            const dateStr = currentDate.toISOString().split("T")[0];

            return {
                key: dayNames[i],
                value: recordingsMap.get(dateStr) || 0,
                date: dateStr,
            };
        });
    },
};
