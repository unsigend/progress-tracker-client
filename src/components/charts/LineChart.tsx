import {
    LineChart as RechartsLineChart,
    Line,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";

/**
 * LineChartData - Interface for line chart data item
 */
interface LineChartData {
    value: number;
}

/**
 * LineChartProps - Interface for LineChart component props
 */
interface LineChartProps {
    chartData: LineChartData[];
}

/**
 * LineChart - Component for displaying a line chart
 * @param props - The props for the LineChart component
 * @param props.chartData - Array of chart data items
 * @returns LineChart component
 */
export const LineChart = ({ chartData }: LineChartProps) => {
    const { theme } = useTheme();
    const [strokeColor, setStrokeColor] = useState("#000000");

    useEffect(() => {
        const isDarkMode =
            document.documentElement.classList.contains("dark") ||
            theme === "dark" ||
            (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        setStrokeColor(isDarkMode ? "#ffffff" : "#000000");
    }, [theme]);

    return (
        <div className="h-48 -mx-2 flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={strokeColor}
                        strokeWidth={3}
                        dot={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};
