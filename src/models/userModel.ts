import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	email: string;
	password: string;
}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
	// If password is modified
	if (this.isModified('password')) {
		try {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
			next();
		} catch (error) {
			next(error as CallbackError);
		}
	}
	// If password is unmodified
	next();
});

// Method to compare the password
userSchema.methods.comparePassword = async function (
	userPassword: string
): Promise<boolean> {
	return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
