import { RandomUtils } from "@/lib/utils/random";

/**
 * LoginChartData - Interface for login chart data item
 */
export interface LoginChartData {
    value: number;
}

/**
 * LOGIN_CHART_DATA - Default chart data for login page
 */
export const LOGIN_CHART_DATA: LoginChartData[] = Array.from(
    { length: 10 },
    () => ({
        value: RandomUtils.number(10, 100),
    })
);

/**
 * LOGIN_CHART_TITLE - Chart title for login page
 */
export const LOGIN_CHART_TITLE = "Track Your Reading Progress";

/**
 * LOGIN_CHART_PRIMARY_METRIC - Primary metric for login page
 */
export const LOGIN_CHART_PRIMARY_METRIC = "+240 min";

/**
 * LOGIN_CHART_SECONDARY_METRIC - Secondary metric for login page
 */
export const LOGIN_CHART_SECONDARY_METRIC = "+40% from last week";
