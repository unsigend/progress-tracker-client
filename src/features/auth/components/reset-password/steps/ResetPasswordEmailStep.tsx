import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldGroup,
} from "@/components/ui/field";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { AlertCircle } from "lucide-react";

/**
 * ResetPasswordEmailStepProps - Interface for ResetPasswordEmailStep component props
 */
interface ResetPasswordEmailStepProps {
    email: string;
    onEmailChange: (email: string) => void;
    onSubmit: () => void;
    error?: string;
    onClearError: () => void;
    isLoading?: boolean;
}

/**
 * ResetPasswordEmailStep - Component for the email step in reset password flow
 * @param props - The props for the ResetPasswordEmailStep component
 * @param props.email - The email value
 * @param props.onEmailChange - Handler for email input change
 * @param props.onSubmit - Handler for form submission
 * @param props.error - Error message to display
 * @param props.onClearError - Handler to clear error
 * @param props.isLoading - Loading state
 * @returns ResetPasswordEmailStep component
 */
export const ResetPasswordEmailStep = ({
    email,
    onEmailChange,
    onSubmit,
    error,
    onClearError,
    isLoading = false,
}: ResetPasswordEmailStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">
                        Reset Password
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>
                            Back to Login
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                    Enter your email address and we'll send you a verification
                    code to reset your password.
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
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <FieldContent>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className={`transition-colors ${
                                    error
                                        ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                        : ""
                                }`}
                                value={email}
                                onChange={(e) => {
                                    onEmailChange(e.target.value);
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
                    disabled={isLoading || !email}
                >
                    {isLoading ? "Sending Code..." : "Send Verification Code"}
                </Button>
            </form>
        </div>
    );
};
