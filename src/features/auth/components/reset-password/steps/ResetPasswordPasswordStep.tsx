import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldGroup,
} from "@/components/ui/field";
import { ArrowLeft, AlertCircle } from "lucide-react";

/**
 * ResetPasswordPasswordStepProps - Interface for ResetPasswordPasswordStep component props
 */
interface ResetPasswordPasswordStepProps {
    newPassword: string;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    error?: string;
    onClearError: () => void;
    isLoading?: boolean;
}

/**
 * ResetPasswordPasswordStep - Component for the new password step in reset password flow
 * @param props - The props for the ResetPasswordPasswordStep component
 * @param props.newPassword - The new password value
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onSubmit - Handler for form submission
 * @param props.onBack - Handler for back button click
 * @param props.error - Error message to display
 * @param props.onClearError - Handler to clear error
 * @param props.isLoading - Loading state
 * @returns ResetPasswordPasswordStep component
 */
export const ResetPasswordPasswordStep = ({
    newPassword,
    onPasswordChange,
    onSubmit,
    onBack,
    error,
    onClearError,
    isLoading = false,
}: ResetPasswordPasswordStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-foreground">
                    New Password
                </h1>
                <p className="text-sm text-muted-foreground text-left">
                    Enter your new password to complete the reset process.
                </p>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="newPassword">
                            New Password
                        </FieldLabel>
                        <FieldContent>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                className={`transition-colors ${
                                    error
                                        ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                        : ""
                                }`}
                                value={newPassword}
                                onChange={(e) => {
                                    onPasswordChange(e.target.value);
                                    if (error) onClearError();
                                }}
                                autoFocus
                            />
                            {error && (
                                <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                                    <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </p>
                                </div>
                            )}
                        </FieldContent>
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading || !newPassword}
                >
                    {isLoading
                        ? "Resetting Password..."
                        : "Reset Password"}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={onBack}
                    disabled={isLoading}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
            </form>
        </div>
    );
};

