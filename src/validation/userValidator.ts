import { z } from 'zod';

// Signup Validator
export const signUpSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string({ message: 'Password should be a valid string' })
		.min(8, { message: 'Password should be atleast 8 characters long' })
		.max(20, { message: 'Password should exceed 20 characters' })
		.regex(/[a-z]/, {
			message: 'Password should contain atleast one lowercase character',
		})
		.regex(/[A-Z]/, {
			message: 'Password should contain atleast one uppercase character',
		})
		.regex(/[0-9]/, { message: 'Password should contain atleast one digit' })
		.regex(/[\W_]/, {
			message: 'Password should contain atleast one special character',
		}),
});
