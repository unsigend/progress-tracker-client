import { useState, useEffect } from "react";
import { ProfileSection } from "@/features/dashboard/components/settings/ProfileSection";
import { SecuritySection } from "@/features/dashboard/components/settings/SecuritySection";
import { useMe } from "@/entities/users/hooks/useMe";
import { useUpdateMe } from "@/entities/users/hooks/useUpdateMe";
import { useLogout } from "@/entities/auth/hooks/useLogout";
import { validateEmail } from "@/entities/auth/validation/email";
import { validateUsername } from "@/entities/auth/validation/username";
import { validatePassword } from "@/entities/auth/validation/password";
import { toast } from "sonner";
import type { IUserUpdate } from "@/entities/users/models/model";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useNavigate } from "react-router";

/**
 * SettingsContainer - Container component that handles settings page data and logic
 * @returns SettingsContainer component
 */
export const SettingsContainer = () => {
    const { data: user, isLoading } = useMe();
    const { mutate: updateMe } = useUpdateMe();
    const { mutate: logout, isPending: isLogoutPending } = useLogout();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<
        Pick<IUserUpdate, "username" | "email">
    >({
        username: "",
        email: "",
    });

    const [isChangePwdDialogOpen, setIsChangePwdDialogOpen] = useState(false);
    const [changePwdForm, setChangePwdForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

    /**
     * handleUpdate - Handler for updating the user
     * @description: This function is used to update the user email and username
     */
    const handleUpdate = () => {
        if (!user) {
            toast.error("User data is not available");
            return;
        }

        const hasEmailChange = formData.email !== user.email;
        const hasUsernameChange = formData.username !== user.username;

        if (!hasEmailChange && !hasUsernameChange) {
            toast.error("No changes to update");
            return;
        }

        const updateData: IUserUpdate = {};

        if (hasEmailChange) {
            const { isValid, error } = validateEmail(formData.email || "");
            if (!isValid) {
                toast.error(error || "Invalid email address");
                return;
            }
            updateData.email = formData.email;
        }

        if (hasUsernameChange) {
            const { isValid, error } = validateUsername(
                formData.username || ""
            );
            if (!isValid) {
                toast.error(error || "Invalid username");
                return;
            }
            updateData.username = formData.username;
        }

        updateMe(updateData, {
            onSuccess: () => {
                toast.success("User updated successfully");
            },
        });
    };

    /**
     * handleUploadAvatar - Handler for uploading the user avatar
     * @description: This function is used to update the user avatar
     */
    const handleUploadAvatar = async (file: File) => {
        updateMe(
            { avatarImage: file },
            {
                onSuccess: () => {
                    toast.success("Avatar uploaded successfully");
                },
            }
        );
    };

    /**
     * handleChangePasswordSubmit - Handler for changing the user password
     * @description: This function is used to change the user password
     */
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

    /**
     * handleLogout - Handler for logging out the user
     * @description: This function is used to logout the user
     */
    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
            },
        });
    };

    return (
        <>
            <ProfileSection
                user={user ?? null}
                formData={formData}
                isLoading={isLoading}
                onUsernameChange={(username) =>
                    setFormData((prev) => ({ ...prev, username }))
                }
                onEmailChange={(email) =>
                    setFormData((prev) => ({ ...prev, email }))
                }
                onUpdate={handleUpdate}
                onUploadAvatar={handleUploadAvatar}
            />

            <SecuritySection
                isChangePwdDialogOpen={isChangePwdDialogOpen}
                onChangePwdDialogOpenChange={setIsChangePwdDialogOpen}
                newPassword={changePwdForm.newPassword}
                confirmPassword={changePwdForm.confirmPassword}
                onNewPasswordChange={(password) =>
                    setChangePwdForm((prev) => ({
                        ...prev,
                        newPassword: password,
                    }))
                }
                onConfirmPasswordChange={(password) =>
                    setChangePwdForm((prev) => ({
                        ...prev,
                        confirmPassword: password,
                    }))
                }
                onChangePasswordSubmit={handleChangePasswordSubmit}
                onLogout={handleLogout}
                isLogoutPending={isLogoutPending}
                isLoading={isLoading}
            />
        </>
    );
};
