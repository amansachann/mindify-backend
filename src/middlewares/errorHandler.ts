// middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Error handling middleware
const errorHandler = (
	err: any, // The error object (can be an instance of Error or ApiError)
	req: Request,
	res: Response,
	next: NextFunction
): any => {
	// If the error is a custom ApiError, return it
	if (err.isApiError) {
		return res.status(err.statusCode).json(ApiResponse.error(err));
	}

	// Log unexpected errors for debugging purposes
	console.error(`[ERROR] ${err.stack || err.message}`);

	// Return a generic 500 error response if it's not an ApiError
	return res
		.status(500)
		.json(ApiResponse.error(new ApiError(500, 'Internal Server Error')));
};

export default errorHandler;
