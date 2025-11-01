import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * ChangePasswordDialogProps - Interface for ChangePasswordDialog component props
 */
interface ChangePasswordDialogProps {
    newPassword: string;
    confirmPassword: string;
    onNewPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (password: string) => void;
    onSubmit: () => void;
}

/**
 * ChangePasswordDialog - Pure UI component for changing password dialog
 * @param props - The props for the ChangePasswordDialog component
 * @param props.newPassword - Current new password value
 * @param props.confirmPassword - Current confirm password value
 * @param props.onNewPasswordChange - Handler for new password change
 * @param props.onConfirmPasswordChange - Handler for confirm password change
 * @param props.onSubmit - Handler for form submission
 * @returns ChangePasswordDialog component
 */
export const ChangePasswordDialog = ({
    newPassword,
    confirmPassword,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
}: ChangePasswordDialogProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Change password</DialogTitle>
                <DialogDescription>
                    Make changes to your password here. Click save when
                    you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => onNewPasswordChange(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">
                            Confirm new password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                onConfirmPasswordChange(e.target.value)
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

