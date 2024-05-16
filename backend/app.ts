import cors from 'cors';
import mongoose from 'mongoose';
import express, { Express } from 'express';

import authRoutes from './routes/auth';
import gameRoutes from './routes/game';
import userRoutes from './routes/user';

require('dotenv').config();

const app: Express = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', gameRoutes);
app.use('/api', userRoutes);

mongoose.connect(process.env.DATABASE_URL as string);
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to Database successfully'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
