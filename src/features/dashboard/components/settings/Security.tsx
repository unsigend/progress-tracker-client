import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, LogOut, Loader2 } from "lucide-react";
import { useMe } from "@/entities/users/hooks/useMe";
import { useUpdateMe } from "@/entities/users/hooks/useUpdateMe";
import { useLogout } from "@/entities/auth/hooks/useLogout";
import { validatePassword } from "@/entities/auth/validation/password";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * Security - Smart component for security settings
 * Handles its own data fetching and security actions
 * @returns Security component
 */
export const Security = () => {
    const navigate = useNavigate();
    const { isLoading } = useMe();
    const { mutate: updateMe } = useUpdateMe();
    const { mutate: logout, isPending: isLogoutPending } = useLogout();

    const [isChangePwdDialogOpen, setIsChangePwdDialogOpen] = useState(false);
    const [changePwdForm, setChangePwdForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChangePasswordSubmit = () => {
        if (changePwdForm.newPassword !== changePwdForm.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const { isValid, error } = validatePassword(changePwdForm.newPassword);
        if (!isValid) {
            toast.error(error || "Invalid password format");
            return;
        }

        updateMe(
            { password: changePwdForm.newPassword },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully");
                    setIsChangePwdDialogOpen(false);
                    setChangePwdForm({ newPassword: "", confirmPassword: "" });
                },
            }
        );
    };

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
            },
        });
    };

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
                            onOpenChange={setIsChangePwdDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Change password
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Change password</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your password here. Click
                                        save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleChangePasswordSubmit();
                                    }}
                                >
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="newPassword">
                                                New password
                                            </Label>
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                placeholder="Enter new password"
                                                value={changePwdForm.newPassword}
                                                onChange={(e) =>
                                                    setChangePwdForm((prev) => ({
                                                        ...prev,
                                                        newPassword:
                                                            e.target.value,
                                                    }))
                                                }
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
                                                value={
                                                    changePwdForm.confirmPassword
                                                }
                                                onChange={(e) =>
                                                    setChangePwdForm((prev) => ({
                                                        ...prev,
                                                        confirmPassword:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="pt-4 border-t">
                        <Button
                            variant="destructive"
                            className="w-full cursor-pointer"
                            onClick={handleLogout}
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

