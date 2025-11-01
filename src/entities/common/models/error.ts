// Error Model

/**
 * IErrorResponse - Interface for error response
 * @message - The error message
 * @error - The error
 * @statusCode - The status code
 */
export interface IErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}
