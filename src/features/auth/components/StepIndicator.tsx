/**
 * StepIndicatorProps - Interface for StepIndicator component props
 */
interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

/**
 * StepIndicator - Component for displaying step progression indicator
 * @param props - The props for the StepIndicator component
 * @param props.currentStep - The current step number
 * @param props.totalSteps - The total number of steps
 * @returns StepIndicator component
 */
export const StepIndicator = ({
    currentStep,
    totalSteps,
}: StepIndicatorProps) => {
    return (
        <div className="flex items-center justify-center space-x-2 mb-8">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index + 1} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            index + 1 === currentStep
                                ? "bg-primary text-primary-foreground"
                                : index + 1 < currentStep
                                ? "bg-primary/80 text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {index + 1 < currentStep ? "✓" : index + 1}
                    </div>
                    {index + 1 < totalSteps && (
                        <div
                            className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                                index + 1 < currentStep
                                    ? "bg-primary/80"
                                    : "bg-muted"
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
