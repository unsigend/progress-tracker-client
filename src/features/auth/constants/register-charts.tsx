import { RandomUtils } from "@/lib/utils/random";
import { PieChart } from "@/components/charts/PieChart";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

/**
 * RegisterChartData - Interface for register chart data
 */
export interface RegisterChartData {
    title: string;
    primaryMetric: string;
    secondaryMetric: string;
    chart: React.ReactNode;
}

/**
 * REGISTER_CHART_DATA - Chart data for each registration step
 */
export const REGISTER_CHART_DATA: RegisterChartData[] = [
    {
        title: "Track Your course progress",
        primaryMetric: "Time Spent",
        secondaryMetric: "21.7h",
        chart: (
            <PieChart
                data={[
                    { key: "lecture", value: 300 },
                    { key: "lab", value: 380 },
                    { key: "notes", value: 200 },
                    { key: "project", value: 420 },
                ]}
                showLegend={true}
                innerRadius={45}
            />
        ),
    },
    {
        title: "Record your reading progress",
        primaryMetric: "+160 pages",
        secondaryMetric: "+28% from last week",
        chart: (
            <LineChart
                chartData={Array.from({ length: 8 }, () => ({
                    value: RandomUtils.number(10, 100),
                }))}
            />
        ),
    },
    {
        title: "Track your project progress",
        primaryMetric: "+58 commits",
        secondaryMetric: "+12% from last month",
        chart: (
            <BarChart
                chartData={[
                    { key: "October", value: 300 },
                    { key: "November", value: 380 },
                    { key: "December", value: 200 },
                    { key: "January", value: 420 },
                    { key: "February", value: 220 },
                    { key: "March", value: 529 },
                ]}
                color="rgb(56, 65, 81)"
                label="Commits"
            />
        ),
    },
    {
        title: "Record your reading progress",
        primaryMetric: "+160 pages",
        secondaryMetric: "+28% from last week",
        chart: (
            <LineChart
                chartData={Array.from({ length: 8 }, () => ({
                    value: RandomUtils.number(10, 100),
                }))}
            />
        ),
    },
];
