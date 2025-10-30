// import dependencies
import { useState } from "react";

// import components
import TimelineCard from "@/features/landing/components/TimelineCard";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown } from "lucide-react";

// import data
import timelineData from "@/features/landing/constants/dev-progress";

/**
 * DevProgressBar component
 * @returns The DevProgressBar component
 */
const DevProgressBar = () => {
    const itemsPerPage = 5;
    const totalItems = timelineData.length;
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);

    const hasMoreItems = visibleCount < totalItems;
    const items = timelineData.slice(0, visibleCount);

    const onShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + itemsPerPage, totalItems));
    };
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Main Features Development Progress
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Track our progress as we build the ultimate progress
                        tracking platform.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="space-y-8">
                        {items.map((item) => (
                            <TimelineCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {hasMoreItems ? (
                    <div className="mt-12 text-center">
                        <Button
                            onClick={onShowMore}
                            variant="outline"
                            size="lg"
                            className="group transition-all cursor-pointer duration-200 hover:bg-primary hover:text-primary-foreground"
                        >
                            <span>Show More</span>
                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                        </Button>
                    </div>
                ) : (
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                More features coming soon...
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevProgressBar;
