import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { KeyRound, LogOut, Loader2 } from "lucide-react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

/**
 * SecuritySectionProps - Interface for SecuritySection component props
 */
interface SecuritySectionProps {
    isChangePwdDialogOpen: boolean;
    onChangePwdDialogOpenChange: (open: boolean) => void;
    newPassword: string;
    confirmPassword: string;
    onNewPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (password: string) => void;
    onChangePasswordSubmit: () => void;
    onLogout: () => void;
    isLogoutPending?: boolean;
    isLoading?: boolean;
}

/**
 * SecuritySection - Pure UI component for security settings
 * @param props - The props for the SecuritySection component
 * @param props.isChangePwdDialogOpen - Whether the change password dialog is open
 * @param props.onChangePwdDialogOpenChange - Handler for dialog open state change
 * @param props.newPassword - Current new password value
 * @param props.confirmPassword - Current confirm password value
 * @param props.onNewPasswordChange - Handler for new password change
 * @param props.onConfirmPasswordChange - Handler for confirm password change
 * @param props.onChangePasswordSubmit - Handler for change password form submission
 * @param props.onLogout - Handler for logout
 * @param props.isLogoutPending - Whether logout is pending
 * @param props.isLoading - Whether the data is loading
 * @returns SecuritySection component
 */
export const SecuritySection = ({
    isChangePwdDialogOpen,
    onChangePwdDialogOpenChange,
    newPassword,
    confirmPassword,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onChangePasswordSubmit,
    onLogout,
    isLogoutPending = false,
    isLoading = false,
}: SecuritySectionProps) => {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <KeyRound className="w-5 h-5" />
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5" />
                    Security
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-medium text-foreground">
                                Password
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Reset your password
                            </p>
                        </div>

                        <Dialog
                            open={isChangePwdDialogOpen}
                            onOpenChange={onChangePwdDialogOpenChange}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Change password
                                </Button>
                            </DialogTrigger>
                            <ChangePasswordDialog
                                newPassword={newPassword}
                                confirmPassword={confirmPassword}
                                onNewPasswordChange={onNewPasswordChange}
                                onConfirmPasswordChange={
                                    onConfirmPasswordChange
                                }
                                onSubmit={onChangePasswordSubmit}
                            />
                        </Dialog>
                    </div>

                    <div className="pt-4 border-t">
                        <Button
                            variant="destructive"
                            className="w-full cursor-pointer"
                            onClick={onLogout}
                            disabled={isLogoutPending}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
