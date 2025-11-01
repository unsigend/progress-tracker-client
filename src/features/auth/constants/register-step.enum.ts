/**
 * RegisterStep - Constants for registration steps
 */
export const RegisterStep = {
    EMAIL: 1,
    PASSWORD: 2,
    USERNAME: 3,
    THEME: 4,
} as const;

/**
 * RegisterStepType - Type for registration step values
 */
export type RegisterStepType = (typeof RegisterStep)[keyof typeof RegisterStep];
