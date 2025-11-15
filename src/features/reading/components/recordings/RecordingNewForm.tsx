import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    BookOpen,
    Calendar as CalendarIcon,
    Clock,
    FileText,
    LibraryBig,
} from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { TimePicker } from "@/components/common/TimePicker";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { UserBookWithBook } from "@/entities/reading/user-books/model/model";
import type { ReadingRecordingCreate } from "@/entities/reading/recordings/model/model";
import { calculateUtils } from "@/lib/utils/calculate";
import { TextUtils } from "@/lib/utils/text";

/**
 * RecordingNewFormProps - Interface for RecordingNewForm component props
 */
interface RecordingNewFormProps {
    formData: ReadingRecordingCreate;
    onFormDataChange: (data: ReadingRecordingCreate) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userBooks: UserBookWithBook[];
    isLoading?: boolean;
    selectedUserBookId: string;
    onUserBookIdChange: (id: string) => void;
    isSubmitting?: boolean;
}

/**
 * RecordingNewForm - Pure UI component for creating a new recording
 * @param props - The props for the RecordingNewForm component
 * @param props.formData - The recording form data
 * @param props.onFormDataChange - Handler for form data changes
 * @param props.onSubmit - Handler for form submission
 * @param props.userBooks - Array of user books to select from
 * @param props.isLoading - Whether user books are loading
 * @param props.selectedUserBookId - Currently selected user book ID
 * @param props.onUserBookIdChange - Handler for user book selection change
 * @param props.isSubmitting - Whether the form is being submitted
 * @returns RecordingNewForm component
 */
export const RecordingNewForm = ({
    formData,
    onFormDataChange,
    onSubmit,
    userBooks,
    isLoading = false,
    selectedUserBookId,
    onUserBookIdChange,
    isSubmitting = false,
}: RecordingNewFormProps) => {
    // UI-only state for form interactions
    const [pageRange, setPageRange] = useState({
        from: "",
        to: "",
    });

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
     * handlePageRangeChange - Handler for page range changes
     * @param field - Field name ("from" or "to")
     * @param value - Field value
     */
    const handlePageRangeChange = (field: "from" | "to", value: string) => {
        const newPageRange = { ...pageRange, [field]: value };
        setPageRange(newPageRange);

        const calculatedPages = calculateUtils.calculatePages(
            newPageRange.from,
            newPageRange.to
        );
        onFormDataChange({
            ...formData,
            pages: calculatedPages,
        });
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

    const isFormValid =
        selectedUserBookId &&
        selectedUserBookId !== "no-books" &&
        pageRange.from &&
        pageRange.to &&
        formData.pages > 0;

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
                        <LibraryBig className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                    New Reading Session
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                    Record your reading progress for today
                </p>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Book Selection */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="book-select"
                            className="flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                            <BookOpen className="w-4 h-4" />
                            Select Book
                        </Label>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="size-6 animate-spin" />
                            </div>
                        ) : (
                            <Select
                                value={selectedUserBookId || ""}
                                onValueChange={onUserBookIdChange}
                            >
                                <SelectTrigger
                                    id="book-select"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Choose a book to read">
                                        {selectedUserBookId &&
                                        userBooks.length > 0
                                            ? (() => {
                                                  const selectedUserBook =
                                                      userBooks.find(
                                                          (userBook) =>
                                                              userBook.id ===
                                                              selectedUserBookId
                                                      );
                                                  const selectedBook =
                                                      selectedUserBook?.book;
                                                  return selectedBook ? (
                                                      <div className="flex flex-col text-left">
                                                          <span className="font-medium">
                                                              {TextUtils.truncateTitle(selectedBook.title)}
                                                          </span>
                                                          {selectedBook.author && (
                                                              <span className="text-xs text-muted-foreground">
                                                                  by{" "}
                                                                  {
                                                                      selectedBook.author
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
                                    {userBooks.length > 0 ? (
                                        userBooks
                                            .filter(
                                                (userBook) =>
                                                    userBook.book !== null
                                            )
                                            .map((userBook) => {
                                                const book = userBook.book!;
                                                return (
                                                    <SelectItem
                                                        key={userBook.id}
                                                        value={userBook.id}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">
                                                                {TextUtils.truncateTitle(book.title)}
                                                            </span>
                                                            {book.author && (
                                                                <span className="text-xs text-left text-muted-foreground">
                                                                    by{" "}
                                                                    {
                                                                        book.author
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })
                                    ) : (
                                        <SelectItem value="no-books" disabled>
                                            No books found - add book first
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
                            Reading Date
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

                    {/* Pages Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <FileText className="w-4 h-4" />
                            Pages Read
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="page-from"
                                    className="text-xs text-muted-foreground"
                                >
                                    From Page
                                </Label>
                                <Input
                                    id="page-from"
                                    type="number"
                                    placeholder="10"
                                    min="1"
                                    value={pageRange.from}
                                    onChange={(e) =>
                                        handlePageRangeChange(
                                            "from",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label
                                    htmlFor="page-to"
                                    className="text-xs text-muted-foreground"
                                >
                                    To Page
                                </Label>
                                <Input
                                    id="page-to"
                                    type="number"
                                    placeholder="15"
                                    min="1"
                                    value={pageRange.to}
                                    onChange={(e) =>
                                        handlePageRangeChange(
                                            "to",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Total Pages
                                </Label>
                                <div className="flex items-center h-9 px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground">
                                    {formData.pages} pages
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Clock className="w-4 h-4" />
                            Reading Time (Optional)
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
                            placeholder="Add any thoughts, quotes, or reflections about your reading..."
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
                            to={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
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
