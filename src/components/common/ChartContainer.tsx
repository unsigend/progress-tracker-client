import { BackButton } from "@/components/common/BackButton";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * ChartContainerProps - Interface for ChartContainer component props
 */
interface ChartContainerProps {
    title: string;
    primaryMetric: string;
    secondaryMetric: string;
    chart: React.ReactNode;
}

/**
 * ChartContainer - Component for displaying a chart with title and metrics
 * @param props - The props for the ChartContainer component
 * @param props.title - The title of the chart
 * @param props.primaryMetric - The primary metric of the chart
 * @param props.secondaryMetric - The secondary metric of the chart
 * @param props.chart - The chart to render
 * @returns ChartContainer component
 */
export const ChartContainer = ({
    title,
    primaryMetric,
    secondaryMetric,
    chart,
}: ChartContainerProps) => {
    return (
        <>
            <div className="flex items-center justify-start gap-4 mb-8">
                <BackButton to={ROUTES_CONSTANTS.LANDING().HOME()} />
                <h2 className="text-muted-foreground text-xl font-medium">
                    {title}
                </h2>
            </div>

            <div className="mb-12">
                <div className="text-4xl font-bold text-foreground mb-4 leading-none">
                    {primaryMetric}
                </div>
                <div className="text-muted-foreground text-base">
                    {secondaryMetric}
                </div>
            </div>

            {chart}

            <div className="mt-8" />
        </>
    );
};
