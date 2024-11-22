// utils/ApiError.ts

export class ApiError extends Error {
	statusCode: number;
	details?: any;
	isApiError: boolean;

	constructor(statusCode: number = 400, message: string, details?: any) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		this.isApiError = true;

		// Capture stack trace
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}

	// Convert the error to a structured response format
	toJSON() {
		return {
			success: false,
			message: this.message,
			error: this.details || {},
			statusCode: this.statusCode,
		};
	}
}
