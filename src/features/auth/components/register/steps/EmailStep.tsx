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
 * EmailStepProps - Interface for EmailStep component props
 */
interface EmailStepProps {
    email: string;
    onEmailChange: (email: string) => void;
    onNext: () => void;
    onGoogleLogin: () => void;
    onGithubLogin: () => void;
    isLoading?: boolean;
}

/**
 * EmailStep - Component for the email step in registration
 * @param props - The props for the EmailStep component
 * @param props.email - The email value
 * @param props.onEmailChange - Handler for email input change
 * @param props.onNext - Handler for next button click
 * @param props.onGoogleLogin - Handler for Google login button click
 * @param props.onGithubLogin - Handler for GitHub login button click
 * @param props.isLoading - Loading state
 * @returns EmailStep component
 */
export const EmailStep = ({
    email,
    onEmailChange,
    onNext,
    onGoogleLogin,
    onGithubLogin,
    isLoading = false,
}: EmailStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-foreground transition-all duration-300">
                        Create your account
                    </h1>
                    <Button
                        variant="link"
                        className="text-sm cursor-pointer p-0 h-auto"
                    >
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>Login</Link>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    Enter your email to get started
                </p>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    onNext();
                }}
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <FieldContent>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => onEmailChange(e.target.value)}
                                autoFocus
                                className="transition-all duration-200"
                            />
                        </FieldContent>
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full transition-all duration-200 cursor-pointer"
                    disabled={isLoading}
                >
                    Continue
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
