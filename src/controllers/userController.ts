import { Request, Response } from 'express';
import { signUpSchema } from '../validation/userValidator';
import User, { IUser } from '../models/userModel';
import { ApiError } from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export async function signUpController(req: Request, res: Response) {
	try {
		// Validate the data
		const validatedData = signUpSchema.parse(req.body);
		const { email, password } = validatedData;

		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res
				.status(409)
				.json(ApiResponse.error(new ApiError(409, 'User Already Exists')));
			return;
		}

		// Create a new User
		const newUser: IUser = new User({
			email,
			password,
		});
		console.log(newUser);
		await newUser.save();
		res.status(200).json(ApiResponse.success('User created successfully'));
		return;
	} catch (error) {
		// Handle errors
		if (error instanceof ApiError) {
			console.error('[Server] Unable to Signup User!!');
			res.status(error.statusCode).json(ApiResponse.error(error));
			return;
		}
		res
			.status(500)
			.json(
				ApiResponse.error(new ApiError(401, 'Unable to Signup User', error))
			);
		return;
	}
}

