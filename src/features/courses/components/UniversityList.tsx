import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * UniversityList - Component for displaying university courses list
 * @returns UniversityList component
 */
export const UniversityList = () => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="text-xl font-semibold text-foreground">
                    University Courses
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                {/* Content will be added later */}
            </CardContent>
        </Card>
    );
};
