import { Pie, PieChart as RechartsPieChart } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useTheme } from "@/hooks/use-theme";

/**
 * ChartDataItem - Interface for pie chart data item
 */
interface ChartDataItem {
    key: string;
    value: number;
    fill?: string;
}

/**
 * PieChartProps - Interface for PieChart component props
 */
interface PieChartProps {
    data: ChartDataItem[];
    className?: string;
    showTooltip?: boolean;
    innerRadius?: number;
    outerRadius?: number;
    showLegend?: boolean;
}

/**
 * Generate theme-aware colors for chart segments
 */
const generateThemeColors = (
    dataLength: number,
    theme: string | undefined
) => {
    const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
        const colors = [
            "#f8fafc",
            "#e2e8f0",
            "#cbd5e1",
            "#94a3b8",
            "#64748b",
            "#475569",
            "#334155",
            "#1e293b",
            "#0f172a",
            "#1e40af",
        ];
        return colors.slice(0, dataLength);
    } else {
        const colors = [
            "#0f172a",
            "#1e293b",
            "#334155",
            "#475569",
            "#64748b",
            "#94a3b8",
            "#cbd5e1",
            "#e2e8f0",
            "#f1f5f9",
            "#3b82f6",
        ];
        return colors.slice(0, dataLength);
    }
};

/**
 * PieChart - Component for displaying a pie/donut chart
 * @param props - The props for the PieChart component
 * @param props.data - Array of chart data items
 * @param props.className - Chart container class name
 * @param props.showTooltip - Show tooltip on hover
 * @param props.innerRadius - Inner radius for donut chart
 * @param props.outerRadius - Outer radius
 * @param props.showLegend - Show legend at the bottom of the chart
 * @returns PieChart component
 */
export const PieChart = ({
    data,
    className = "mx-auto aspect-square max-h-[250px]",
    showTooltip = true,
    innerRadius = 60,
    outerRadius = 80,
    showLegend = false,
}: PieChartProps) => {
    const { theme } = useTheme();

    const processedData = data.map((item, index) => ({
        ...item,
        fill:
            item.fill || generateThemeColors(data.length, theme)[index],
    }));

    const chartConfig: ChartConfig = {
        value: {
            label: "Value",
        },
        ...processedData.reduce(
            (config, item) => {
                config[item.key.toLowerCase().replace(/\s+/g, "")] = {
                    label: item.key,
                    color: item.fill,
                };
                return config;
            },
            {} as Record<string, unknown>
        ),
    } satisfies ChartConfig;

    return (
        <ChartContainer config={chartConfig} className={className}>
            <RechartsPieChart>
                {showTooltip && (
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                )}
                <Pie
                    data={processedData}
                    dataKey="value"
                    nameKey="key"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    strokeWidth={2}
                    className="outline-none focus:outline-none"
                />
                {showLegend && (
                    <ChartLegend
                        content={<ChartLegendContent nameKey="key" />}
                        className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-md"
                    />
                )}
            </RechartsPieChart>
        </ChartContainer>
    );
};
