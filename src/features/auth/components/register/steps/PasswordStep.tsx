import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

/**
 * PasswordStepProps - Interface for PasswordStep component props
 */
interface PasswordStepProps {
    password: string;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    isLoading?: boolean;
}

/**
 * PasswordStep - Component for the password step in registration
 * @param props - The props for the PasswordStep component
 * @param props.password - The password value
 * @param props.onPasswordChange - Handler for password input change
 * @param props.onSubmit - Handler for form submission
 * @param props.onBack - Handler for back button click
 * @param props.isLoading - Loading state
 * @returns PasswordStep component
 */
export const PasswordStep = ({
    password,
    onPasswordChange,
    onSubmit,
    onBack,
    isLoading = false,
}: PasswordStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-foreground transition-all duration-300">
                    Secure your account
                </h1>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    Choose a strong password to protect your account
                </p>
            </div>

            <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldContent>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    onPasswordChange(e.target.value)
                                }
                                autoFocus
                                className="transition-all duration-200"
                            />
                            <FieldDescription>
                                Password must be at least 8 characters long
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                </FieldGroup>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1 transition-all duration-200 cursor-pointer"
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 transition-all duration-200 cursor-pointer"
                        disabled={isLoading}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};
