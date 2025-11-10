import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { X, Plus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { COURSE_CONSTANTS } from "@/constants/course.constant";

/**
 * CategorySelectorProps - Interface for CategorySelector component props
 */
interface CategorySelectorProps {
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    className?: string;
}

/**
 * CategorySelector - Component for selecting course categories
 * @param props - The props for the CategorySelector component
 * @param props.selectedCategories - Currently selected categories
 * @param props.onCategoriesChange - Handler for category changes
 * @param props.className - Optional additional className
 * @returns CategorySelector component
 */
export const CategorySelector = ({
    selectedCategories,
    onCategoriesChange,
    className,
}: CategorySelectorProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const maxCategories = COURSE_CONSTANTS.COURSE.CATEGORIES_MAX_LENGTH;
    const canAddMore = selectedCategories.length < maxCategories;

    // Filter predefined categories based on search query
    const query = searchQuery.toLowerCase().trim();
    const filteredCategories = query
        ? COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.filter((cat) =>
              cat.toLowerCase().includes(query)
          )
        : [];

    // Check if search query matches a custom category (not in predefined)
    const trimmedQuery = searchQuery.trim();
    const isCustomCategory =
        trimmedQuery &&
        !COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.some(
            (cat) => cat.toLowerCase() === trimmedQuery.toLowerCase()
        );

    // Check if search query is already selected
    const isAlreadySelected = trimmedQuery
        ? selectedCategories.some(
              (cat) => cat.toLowerCase() === trimmedQuery.toLowerCase()
          )
        : false;

    const handleAddCategory = (category: string) => {
        if (!canAddMore) return;

        const trimmedCategory = category.trim();
        if (!trimmedCategory) return;

        const isDuplicate = selectedCategories.some(
            (cat) => cat.toLowerCase() === trimmedCategory.toLowerCase()
        );
        if (isDuplicate) return;

        onCategoriesChange([...selectedCategories, trimmedCategory]);
        setSearchQuery("");
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        // Only open popover if user has typed something
        if (value.trim()) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleInputFocus = () => {
        // Only open if there's already text in the input
        if (searchQuery.trim()) {
            setIsOpen(true);
        }
    };

    const handleRemoveCategory = (categoryToRemove: string) => {
        onCategoriesChange(
            selectedCategories.filter(
                (cat) => cat.toLowerCase() !== categoryToRemove.toLowerCase()
            )
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === "Enter" &&
            trimmedQuery &&
            !isAlreadySelected &&
            canAddMore
        ) {
            e.preventDefault();
            handleAddCategory(searchQuery);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 border border-border rounded-md bg-muted/30 min-h-[60px]">
                    {selectedCategories.map((category) => (
                        <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs font-normal pr-1 py-1.5 pl-2.5 group"
                        >
                            <span>{category}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveCategory(category)}
                                className="ml-1.5 rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
                                aria-label={`Remove ${category}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Category Input with Popover */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <PopoverTrigger asChild>
                        <Input
                            type="text"
                            placeholder={
                                canAddMore
                                    ? "Search or create categories..."
                                    : `Maximum ${maxCategories} categories reached`
                            }
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={handleInputFocus}
                            disabled={!canAddMore}
                            className="pl-9 pr-10"
                        />
                    </PopoverTrigger>
                    {trimmedQuery &&
                        !isAlreadySelected &&
                        canAddMore &&
                        (isCustomCategory ||
                            filteredCategories.length === 0) && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddCategory(searchQuery);
                                    }}
                                    aria-label="Add custom category"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        )}
                </div>
                <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <div className="max-h-[300px] overflow-y-auto">
                        {/* Predefined Categories */}
                        {filteredCategories.length > 0 && (
                            <div className="p-2">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                                    Matching Categories
                                </div>
                                <div className="space-y-0.5">
                                    {filteredCategories.map((category) => {
                                        const isSelected =
                                            selectedCategories.some(
                                                (cat) =>
                                                    cat.toLowerCase() ===
                                                    category.toLowerCase()
                                            );
                                        return (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (
                                                        !isSelected &&
                                                        canAddMore
                                                    ) {
                                                        handleAddCategory(
                                                            category
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    isSelected || !canAddMore
                                                }
                                                className={cn(
                                                    "w-full text-left px-2 py-1.5 text-sm rounded-sm transition-colors",
                                                    isSelected || !canAddMore
                                                        ? "text-muted-foreground cursor-not-allowed opacity-50"
                                                        : "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                                )}
                                            >
                                                {category}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Custom Category Option */}
                        {trimmedQuery &&
                            isCustomCategory &&
                            !isAlreadySelected &&
                            canAddMore && (
                                <div className="border-t border-border p-2">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddCategory(searchQuery);
                                        }}
                                        className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Create "{trimmedQuery}"</span>
                                    </button>
                                </div>
                            )}

                        {/* Max Categories Reached */}
                        {!canAddMore && (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                Maximum {maxCategories} categories reached.
                                Remove one to add more.
                            </div>
                        )}

                        {/* No Results */}
                        {trimmedQuery &&
                            filteredCategories.length === 0 &&
                            isCustomCategory &&
                            canAddMore && (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No matching categories found
                                </div>
                            )}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground">
                {canAddMore
                    ? `Select from popular categories or create your own. Press Enter to add. (${selectedCategories.length}/${maxCategories})`
                    : `Maximum ${maxCategories} categories reached. Remove one to add more.`}
            </p>
        </div>
    );
};
