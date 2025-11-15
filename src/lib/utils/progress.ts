/**
 * ProgressUtils - Utility functions for calculating progress
 */
export const ProgressUtils = {
    /**
     * calculatePercentage - Calculate percentage from current and total
     * @param current - Current value
     * @param total - Total value
     * @returns Percentage rounded to nearest integer
     */
    calculatePercentage: (current: number, total: number): number => {
        if (total === 0) return 0;
        return Math.round((current / total) * 100);
    },

    /**
     * calculateProgress - Calculate progress with clamping between 0-100
     * @param current - Current value
     * @param total - Total value
     * @returns Clamped percentage (0-100)
     */
    calculateProgress: (current: number, total: number): number => {
        const percentage = ProgressUtils.calculatePercentage(current, total);
        return Math.max(0, Math.min(100, percentage));
    },
};
