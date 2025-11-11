import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    GraduationCap,
    Calendar as CalendarIcon,
    Clock,
    FileText,
    BookOpen,
} from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { TimePicker } from "@/components/common/TimePicker";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import type { IUserCourseWithCourse } from "@/entities/course/user-courses/model/model";
import type { ICourseRecordingCreate } from "@/entities/course/recordings/models/model";
import { calculateUtils } from "@/lib/utils/calculate";

/**
 * RecordingNewFormProps - Interface for RecordingNewForm component props
 */
interface RecordingNewFormProps {
    formData: ICourseRecordingCreate;
    onFormDataChange: (data: ICourseRecordingCreate) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userCourses: IUserCourseWithCourse[];
    isLoading?: boolean;
    selectedUserCourseId: string;
    onUserCourseIdChange: (id: string) => void;
    isSubmitting?: boolean;
}

/**
 * RecordingNewForm - Pure UI component for creating a new course recording
 * @param props - The props for the RecordingNewForm component
 * @param props.formData - The recording form data
 * @param props.onFormDataChange - Handler for form data changes
 * @param props.onSubmit - Handler for form submission
 * @param props.userCourses - Array of user courses to select from
 * @param props.isLoading - Whether user courses are loading
 * @param props.selectedUserCourseId - Currently selected user course ID
 * @param props.onUserCourseIdChange - Handler for user course selection change
 * @param props.isSubmitting - Whether the form is being submitted
 * @returns RecordingNewForm component
 */
export const RecordingNewForm = ({
    formData,
    onFormDataChange,
    onSubmit,
    userCourses,
    isLoading = false,
    selectedUserCourseId,
    onUserCourseIdChange,
    isSubmitting = false,
}: RecordingNewFormProps) => {
    // UI-only state for form interactions
    const [timeRange, setTimeRange] = useState({
        from: "",
        to: "",
    });

    const [calendarOpen, setCalendarOpen] = useState(false);

    /**
     * handleDateSelect - Handler for date selection
     * @param date - Selected date
     */
    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            onFormDataChange({
                ...formData,
                date: date.toISOString(),
            });
            setCalendarOpen(false);
        }
    };

    /**
     * handleTimeRangeChange - Handler for time range changes
     * @param field - Field name ("from" or "to")
     * @param value - Field value
     */
    const handleTimeRangeChange = (field: "from" | "to", value: string) => {
        const newTimeRange = { ...timeRange, [field]: value };
        setTimeRange(newTimeRange);

        const calculatedMinutes = calculateUtils.calculateMinutes(
            newTimeRange.from,
            newTimeRange.to
        );
        onFormDataChange({
            ...formData,
            minutes: calculatedMinutes,
        });
    };

    /**
     * handleRecordTypeChange - Handler for record type selection change
     * @param value - Selected record type
     */
    const handleRecordTypeChange = (value: string) => {
        onFormDataChange({
            ...formData,
            recordType: value,
        });
    };

    const isFormValid =
        selectedUserCourseId &&
        selectedUserCourseId !== "no-courses" &&
        formData.date &&
        formData.minutes > 0 &&
        formData.recordType;

    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader className="text-center">
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-2">
                    <BackButton onClick={() => navigate(-1)} />
                </div>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-muted rounded-full">
                        <GraduationCap className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                    New Course Session
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                    Record your course progress for today
                </p>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Course Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="course-select"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <BookOpen className="w-4 h-4" />
                            Select Course
                        </Label>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="size-6 animate-spin" />
                            </div>
                        ) : (
                            <Select
                                value={selectedUserCourseId || ""}
                                onValueChange={onUserCourseIdChange}
                            >
                                <SelectTrigger
                                    id="course-select"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Choose a course">
                                        {selectedUserCourseId &&
                                        userCourses.length > 0
                                            ? (() => {
                                                  const selectedUserCourse =
                                                      userCourses.find(
                                                          (userCourse) =>
                                                              userCourse.id ===
                                                              selectedUserCourseId
                                                      );
                                                  const selectedCourse =
                                                      selectedUserCourse?.course;
                                                  return selectedCourse ? (
                                                      <div className="flex flex-col text-left">
                                                          <span className="font-medium">
                                                              {
                                                                  selectedCourse.name
                                                              }
                                                          </span>
                                                          {selectedCourse.source && (
                                                              <span className="text-xs text-muted-foreground">
                                                                  {
                                                                      selectedCourse.source
                                                                  }
                                                              </span>
                                                          )}
                                                      </div>
                                                  ) : null;
                                              })()
                                            : null}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {userCourses.length > 0 ? (
                                        userCourses
                                            .filter(
                                                (userCourse) =>
                                                    userCourse.course !== null
                                            )
                                            .map((userCourse) => {
                                                const course =
                                                    userCourse.course!;
                                                return (
                                                    <SelectItem
                                                        key={userCourse.id}
                                                        value={userCourse.id}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">
                                                                {course.name}
                                                            </span>
                                                            {course.source && (
                                                                <span className="text-xs text-left text-muted-foreground">
                                                                    {
                                                                        course.source
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })
                                    ) : (
                                        <SelectItem value="no-courses" disabled>
                                            No courses found - add course first
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="date-picker"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Session Date
                        </Label>
                        <Popover
                            open={calendarOpen}
                            onOpenChange={setCalendarOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    id="date-picker"
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date
                                        ? format(new Date(formData.date), "PPP")
                                        : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        formData.date
                                            ? new Date(formData.date)
                                            : undefined
                                    }
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Record Type Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="record-type-select"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <FileText className="w-4 h-4" />
                            Record Type
                        </Label>
                        <Select
                            value={formData.recordType || ""}
                            onValueChange={handleRecordTypeChange}
                        >
                            <SelectTrigger
                                id="record-type-select"
                                className="w-full"
                            >
                                <SelectValue placeholder="Select record type" />
                            </SelectTrigger>
                            <SelectContent>
                                {COURSE_CONSTANTS.RECORDING.PREDEFINED_RECORD_TYPES.map(
                                    (recordType) => (
                                        <SelectItem
                                            key={recordType}
                                            value={recordType}
                                        >
                                            {recordType.charAt(0) +
                                                recordType
                                                    .slice(1)
                                                    .toLowerCase()}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Clock className="w-4 h-4" />
                            Study Time
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Start Time
                                </Label>
                                <TimePicker
                                    value={timeRange.from}
                                    onChange={(value) =>
                                        handleTimeRangeChange("from", value)
                                    }
                                    placeholder="Select start time"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    End Time
                                </Label>
                                <TimePicker
                                    value={timeRange.to}
                                    onChange={(value) =>
                                        handleTimeRangeChange("to", value)
                                    }
                                    placeholder="Select end time"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Duration
                                </Label>
                                <div className="flex items-center h-9 px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                                    {formData.minutes} minutes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="notes"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <FileText className="w-4 h-4" />
                            Notes (Optional)
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any thoughts, key concepts, or reflections about your study session..."
                            value={formData.notes || ""}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) =>
                                onFormDataChange({
                                    ...formData,
                                    notes: e.target.value,
                                })
                            }
                            className="w-full min-h-[120px] resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            to={ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()}
                        >
                            <Button
                                type="button"
                                variant="outline"
                                className="px-6"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="px-6"
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Recording...
                                </>
                            ) : (
                                "Record Session"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
