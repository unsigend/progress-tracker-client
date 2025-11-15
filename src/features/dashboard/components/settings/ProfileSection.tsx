import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, User as UserIcon, Edit3, Loader2 } from "lucide-react";
import { FileUpload } from "@/components/common/FileUpload";
import type { User, UserUpdate } from "@/entities/users/models/model";

/**
 * ProfileSectionProps - Interface for ProfileSection component props
 */
interface ProfileSectionProps {
    user: User | null;
    formData: Pick<UserUpdate, "username" | "email">;
    isLoading?: boolean;
    onUsernameChange: (username: string) => void;
    onEmailChange: (email: string) => void;
    onUpdate: () => void;
    onUploadAvatar: (file: File) => Promise<void>;
}

/**
 * ProfileSection - Pure UI component for displaying and editing user profile
 * @param props - The props for the ProfileSection component
 * @param props.user - The current user data
 * @param props.formData - The form data (username, email, and avatar image)
 * @param props.isLoading - Whether the data is loading
 * @param props.onUsernameChange - Handler for username change
 * @param props.onEmailChange - Handler for email change
 * @param props.onUpdate - Handler for form submission
 * @param props.onUploadAvatar - Handler for avatar upload
 * @returns ProfileSection component
 */
export const ProfileSection = ({
    user,
    formData,
    isLoading = false,
    onUsernameChange,
    onEmailChange,
    onUpdate,
    onUploadAvatar,
}: ProfileSectionProps) => {
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
                                        onUsernameChange(e.target.value)
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Your username will be used to identify you
                                    on the platform.
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
                                            onEmailChange(e.target.value)
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
                                handleUpload={onUploadAvatar}
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

                    <Button onClick={onUpdate}>Update</Button>
                </div>
            </CardContent>
        </Card>
    );
};
