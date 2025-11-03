import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { IReadingStatistics } from "@/entities/statistics/reading/models/model";
import { DatesUtils } from "@/lib/utils/dates";

/**
 * DailyCardProps - Interface for DailyCard component props
 */
interface DailyCardProps {
    readingStatistics: IReadingStatistics | null;
    isLoading: boolean;
}

/**
 * DailyCard - Pure UI component for displaying daily reading summary
 * @param props - The props for the DailyCard component
 * @param props.readingStatistics - The daily reading statistics
 * @param props.isLoading - Whether the data is loading
 * @param props.onAddRecordingClick - Handler for add recording button click
 * @returns DailyCard component
 */
export const DailyCard = ({ readingStatistics, isLoading }: DailyCardProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    Daily Summary
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS()
                            .NEW()}
                    >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Date */}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {DatesUtils.formatDate(new Date())}
                            </p>
                        </div>

                        {/* Pages Read */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Pages Read
                            </p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {readingStatistics?.totalPages}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    pages
                                </p>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-border"></div>

                        {/* Time Spent */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Time Spent
                            </p>
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-foreground">
                                    {
                                        DatesUtils.formatDuration(
                                            readingStatistics?.totalMinutes ?? 0
                                        ).value
                                    }
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {
                                        DatesUtils.formatDuration(
                                            readingStatistics?.totalMinutes ?? 0
                                        ).unit
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
