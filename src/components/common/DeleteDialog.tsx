import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * DeleteDialogProps - Interface for DeleteDialog component props
 */
interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

/**
 * DeleteDialog - Generic delete confirmation dialog component
 * @param props - The props for the DeleteDialog component
 * @param props.open - Whether the dialog is open
 * @param props.onOpenChange - Callback when the dialog open state changes
 * @param props.title - Title of the dialog
 * @param props.description - Description text for the dialog
 * @param props.onConfirm - Callback when user confirms the deletion
 * @param props.confirmText - Text for the confirm button (default: "Delete")
 * @param props.cancelText - Text for the cancel button (default: "Cancel")
 * @returns DeleteDialog component
 */
export const DeleteDialog = ({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmText = "Delete",
    cancelText = "Cancel",
}: DeleteDialogProps) => {
    /**
     * Handle the confirm action
     */
    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    /**
     * Handle the cancel action
     */
    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

