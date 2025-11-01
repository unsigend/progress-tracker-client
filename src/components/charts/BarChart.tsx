import {
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    XAxis,
} from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * BarChartData - Interface for bar chart data item
 */
interface BarChartData {
    key: string;
    value: number;
}

/**
 * BarChartProps - Interface for BarChart component props
 */
interface BarChartProps {
    chartData: BarChartData[];
    color?: string;
    label: string;
    className?: string;
}

/**
 * BarChart - Component for displaying a bar chart
 * @param props - The props for the BarChart component
 * @param props.chartData - Array of chart data items
 * @param props.color - Color of the bars
 * @param props.label - Label of the chart when hovering over the bars
 * @param props.className - Chart container class name
 * @returns BarChart component
 */
export const BarChart = ({
    chartData,
    color,
    label,
    className,
}: BarChartProps) => {
    const barColor = color || "#1e293b";

    const chartConfig: ChartConfig = {
        value: {
            label: label,
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className={className}>
            <RechartsBarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="key"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                    dataKey="value"
                    fill={barColor}
                    radius={[4, 4, 0, 0]}
                    className="outline-none focus:outline-none"
                    maxBarSize={40}
                />
            </RechartsBarChart>
        </ChartContainer>
    );
};
