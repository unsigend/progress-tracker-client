import { ChartContainer } from "@/components/common/ChartContainer";
import { REGISTER_CHART_DATA } from "@/features/auth/constants/register-charts";

/**
 * RegisterChartProps - Interface for RegisterChart component props
 */
interface RegisterChartProps {
    stepIndex: number;
}

/**
 * RegisterChart - Component for displaying the register chart section per step
 * @param props - The props for the RegisterChart component
 * @param props.stepIndex - The current step index (0-based)
 * @returns RegisterChart component
 */
export const RegisterChart = ({ stepIndex }: RegisterChartProps) => {
    const chartData = REGISTER_CHART_DATA[stepIndex];

    if (!chartData) {
        return null;
    }

    return (
        <ChartContainer
            title={chartData.title}
            primaryMetric={chartData.primaryMetric}
            secondaryMetric={chartData.secondaryMetric}
            chart={chartData.chart}
        />
    );
};
