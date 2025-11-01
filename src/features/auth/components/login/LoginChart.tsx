import { ChartContainer } from "@/components/common/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import {
    LOGIN_CHART_DATA,
    LOGIN_CHART_TITLE,
    LOGIN_CHART_PRIMARY_METRIC,
    LOGIN_CHART_SECONDARY_METRIC,
} from "@/features/auth/constants/login-chart";

/**
 * LoginChart - Component for displaying the login chart section
 * @returns LoginChart component
 */
export const LoginChart = () => {
    return (
        <ChartContainer
            title={LOGIN_CHART_TITLE}
            primaryMetric={LOGIN_CHART_PRIMARY_METRIC}
            secondaryMetric={LOGIN_CHART_SECONDARY_METRIC}
            chart={<LineChart chartData={LOGIN_CHART_DATA} />}
        />
    );
};
