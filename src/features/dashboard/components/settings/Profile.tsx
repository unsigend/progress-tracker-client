import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, User as UserIcon, Edit3, Loader2 } from "lucide-react";
import { FileUpload } from "@/components/common/FileUpload";
import { useMe } from "@/entities/users/hooks/useMe";
import { useUpdateMe } from "@/entities/users/hooks/useUpdateMe";
import { validateEmail } from "@/entities/auth/validation/email";
import { validateUsername } from "@/entities/auth/validation/username";
import type { UserUpdate } from "@/entities/users/models/model";

/**
 * Profile - Smart component for displaying and editing user profile
 * Handles its own data fetching and update logic
 * @returns Profile component
 */
export const Profile = () => {
    const { data: user, isLoading } = useMe();
    const { mutate: updateMe } = useUpdateMe();

    const [formData, setFormData] = useState<
        Pick<UserUpdate, "username" | "email">
    >({
        username: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

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

        const updateData: UserUpdate = {};

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

    const getAvatarFallback = () => {
        return user?.username?.charAt(0).toUpperCase() || "U";
    };

    if (isLoading || !user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
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
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-start justify-between gap-16">
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={formData.username || ""}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }))
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Your username will be used to identify you on
                                    the platform.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        className="pr-10"
                                        value={formData.email || ""}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg
                                            className="w-4 h-4 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    This email should be unique and used for
                                    login.
                                </p>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <Avatar className="w-28 h-28">
                                <AvatarImage
                                    src={user.avatarUrl || undefined}
                                    alt={`${user.username} avatar`}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">
                                    {getAvatarFallback()}
                                </AvatarFallback>
                            </Avatar>

                            <FileUpload
                                handleUpload={handleUploadAvatar}
                                maxFileSizeMB={1}
                                icon={<Edit3 className="w-4 h-4" />}
                                text="Edit"
                                className="w-full mt-3"
                            />
                        </div>
                    </div>

                    {user.provider && user.provider.length > 1 && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                Connected accounts
                            </h3>
                            {user.provider.map((providerItem: string) =>
                                providerItem !== "local" ? (
                                    <div
                                        key={providerItem}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            {providerItem === "github" ? (
                                                <Github className="w-4 h-4" />
                                            ) : providerItem === "google" ? (
                                                <Mail className="w-4 h-4" />
                                            ) : (
                                                <UserIcon className="w-4 h-4" />
                                            )}
                                            <span className="font-medium text-foreground">
                                                {providerItem
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    providerItem?.slice(1)}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                        >
                                            Connected
                                        </Badge>
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}

                    <Button onClick={handleUpdate}>Update</Button>
                </div>
            </CardContent>
        </Card>
    );
};

