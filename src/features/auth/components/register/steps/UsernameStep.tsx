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
 * UsernameStepProps - Interface for UsernameStep component props
 */
interface UsernameStepProps {
    username: string;
    onUsernameChange: (username: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    isLoading?: boolean;
}

/**
 * UsernameStep - Component for the username step in registration
 * @param props - The props for the UsernameStep component
 * @param props.username - The username value
 * @param props.onUsernameChange - Handler for username input change
 * @param props.onSubmit - Handler for submit button click
 * @param props.onBack - Handler for back button click
 * @param props.isLoading - Loading state
 * @returns UsernameStep component
 */
export const UsernameStep = ({
    username,
    onUsernameChange,
    onSubmit,
    onBack,
    isLoading = false,
}: UsernameStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-foreground transition-all duration-300">
                    Choose your username
                </h1>
                <p className="text-sm text-muted-foreground transition-all duration-300 text-left">
                    Pick a unique username that represents you
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
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <FieldContent>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) =>
                                    onUsernameChange(e.target.value)
                                }
                                autoFocus
                                className="transition-all duration-200"
                            />
                            <FieldDescription>
                                Username must contain only letters, numbers, and
                                underscores
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
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    );
};

