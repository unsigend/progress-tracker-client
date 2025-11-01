import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * LoginFormData - Interface for login form data
 */
interface LoginFormData {
    email: string;
    password: string;
}

/**
 * LoginFormProps - Interface for LoginForm component props
 */
interface LoginFormProps {
    formData: LoginFormData;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onGoogleLogin: () => void;
    onGithubLogin: () => void;
    isLoading?: boolean;
}

/**
 * LoginForm - Component for displaying the login form
 * @param props - The props for the LoginForm component
 * @param props.formData - The form data object
 * @param props.onEmailChange - Handler for email input change
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onSubmit - Handler for form submission
 * @param props.onGoogleLogin - Handler for Google login button click
 * @param props.onGithubLogin - Handler for GitHub login button click
 * @param props.isLoading - Loading state for the form
 * @returns LoginForm component
 */
export const LoginForm = ({
    formData,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onGoogleLogin,
    onGithubLogin,
    isLoading = false,
}: LoginFormProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground">
                        Welcome back!
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().REGISTER()}>
                            Sign Up
                        </Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                    Enter your email below to login to your account
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <FieldContent>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className="transition-colors"
                                value={formData.email}
                                onChange={(e) => onEmailChange(e.target.value)}
                            />
                        </FieldContent>
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                to={ROUTES_CONSTANTS.AUTH().RESET_PASSWORD()}
                                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline cursor-pointer transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <FieldContent>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="transition-colors"
                                value={formData.password}
                                onChange={(e) =>
                                    onPasswordChange(e.target.value)
                                }
                            />
                        </FieldContent>
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="space-y-4">
                <FieldSeparator className="mb-4">
                    Or continue with
                </FieldSeparator>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={isLoading}
                        onClick={onGoogleLogin}
                    >
                        <img
                            src="/images/app/google.svg"
                            alt="Google"
                            className="size-4 mr-2 dark:invert"
                        />
                        Continue with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={isLoading}
                        onClick={onGithubLogin}
                    >
                        <img
                            src="/images/app/github.svg"
                            alt="GitHub"
                            className="size-4 mr-2 dark:invert"
                        />
                        Continue with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
};

