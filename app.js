import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/users.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
