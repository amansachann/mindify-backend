import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// Start the server
function startServer() {
	try {
		app.listen(PORT, () => {
			console.log(`[Server] Server running on PORT [${PORT}]`);
		});
	} catch (error) {
		console.error('[Server] Error starting server');
		console.error(error);
	}
}

// Initialize the App
async function initializeApp() {
	console.log(`-----------------------------------------------------`);
	await connectDB();
	startServer();
	console.log(`-----------------------------------------------------`);
}

initializeApp();
