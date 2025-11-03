/**
 * calculateUtils - Utility functions for calculating pages and minutes
 */
export const calculateUtils = {
    /**
     * calculatePages - Calculate pages from range
     * @param from - From page number
     * @param to - To page number
     * @returns Calculated pages
     */
    calculatePages: (from: string, to: string): number => {
        const fromPage = parseInt(from, 10);
        const toPage = parseInt(to, 10);
        if (fromPage && toPage && toPage >= fromPage) {
            return toPage - fromPage + 1;
        }
        return 0;
    },

    /**
     * calculateMinutes - Calculate minutes from time range
     * @param fromTime - Start time string
     * @param toTime - End time string
     * @returns Calculated minutes
     */
    calculateMinutes: (fromTime: string, toTime: string): number => {
        if (!fromTime || !toTime) return 0;

        const parseTime = (timeStr: string): number => {
            const [time, period] = timeStr.split(" ");
            const [hour, minute] = time.split(":").map(Number);

            let hour24 = hour;
            if (period === "AM" && hour === 12) {
                hour24 = 0;
            } else if (period === "PM" && hour !== 12) {
                hour24 = hour + 12;
            }

            return hour24 * 60 + minute;
        };

        const fromMinutes = parseTime(fromTime);
        const toMinutes = parseTime(toTime);

        if (toMinutes >= fromMinutes) {
            return toMinutes - fromMinutes;
        }
        return 0;
    },
};
