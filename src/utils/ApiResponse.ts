// utils/ApiResponse.ts

import { ApiError } from './ApiError';

interface ApiResponsePayload {
	success: boolean;
	message: string;
	data?: any; // Optional, for success data
	error?: any; // Optional, for error details
	statusCode: number;
}

class ApiResponse {
	// Success response
	static success(
		message: string,
		data?: any,
		statusCode: number = 200
	): ApiResponsePayload {
		return {
			success: true,
			message,
			data,
			statusCode,
		};
	}

	// Error response using ApiError
	static error(error: ApiError): ApiResponsePayload {
		return {
			success: false,
			message: error.message,
			error: error.toJSON().error,
			statusCode: error.statusCode,
		};
	}

	// Validation Error response
	static validationError(
		message: string,
		details: any,
		statusCode: number = 422
	): ApiResponsePayload {
		return {
			success: false,
			message,
			error: details,
			statusCode,
		};
	}
}

export default ApiResponse;
