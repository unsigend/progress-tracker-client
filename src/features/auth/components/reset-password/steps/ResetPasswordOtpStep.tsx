import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { ArrowLeft, AlertCircle } from "lucide-react";

/**
 * ResetPasswordOtpStepProps - Interface for ResetPasswordOtpStep component props
 */
interface ResetPasswordOtpStepProps {
    code: string;
    onCodeChange: (code: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    error?: string;
    onClearError: () => void;
    isLoading?: boolean;
}

/**
 * ResetPasswordOtpStep - Component for the OTP verification step in reset password flow
 * @param props - The props for the ResetPasswordOtpStep component
 * @param props.code - The OTP code value
 * @param props.onCodeChange - Handler for code input change
 * @param props.onSubmit - Handler for form submission
 * @param props.onBack - Handler for back button click
 * @param props.error - Error message to display
 * @param props.onClearError - Handler to clear error
 * @param props.isLoading - Loading state
 * @returns ResetPasswordOtpStep component
 */
export const ResetPasswordOtpStep = ({
    code,
    onCodeChange,
    onSubmit,
    onBack,
    error,
    onClearError,
    isLoading = false,
}: ResetPasswordOtpStepProps) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold text-foreground">
                    Verify Code
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                    Enter the 6-digit verification code sent to your email
                    address.
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
                        <FieldLabel>Verification Code</FieldLabel>
                        <FieldContent className="flex flex-col gap-4">
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <Input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className={`w-12 h-12 text-center text-lg font-semibold transition-colors ${
                                            error
                                                ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                                : ""
                                        }`}
                                        value={code[index] || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value && !/^\d$/.test(value)) {
                                                return;
                                            }
                                            const newCode = code.split("");
                                            newCode[index] = value;
                                            const updatedCode = newCode
                                                .join("")
                                                .slice(0, 6);
                                            onCodeChange(updatedCode);
                                            if (error) onClearError();

                                            if (value && index < 5) {
                                                const nextInput = e.target
                                                    .parentElement?.children[
                                                    index + 1
                                                ] as
                                                    | HTMLInputElement
                                                    | undefined;
                                                nextInput?.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Backspace" &&
                                                !code[index] &&
                                                index > 0
                                            ) {
                                                const prevInput = e.target
                                                    .parentElement?.children[
                                                    index - 1
                                                ] as
                                                    | HTMLInputElement
                                                    | undefined;
                                                prevInput?.focus();
                                            }
                                        }}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                            {error && (
                                <div className="mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                                    <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </p>
                                </div>
                            )}
                            <FieldDescription>
                                Check your email for the 6-digit verification
                                code
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading || code.length !== 6}
                >
                    {isLoading ? "Verifying..." : "Verify Code"}
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
