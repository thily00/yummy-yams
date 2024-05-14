import mongoose from 'mongoose';
import express, { Express } from 'express';

import authRoutes from './routes/auth';
import gameRoutes from './routes/game';

require('dotenv').config();

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', gameRoutes);

mongoose.connect(process.env.DATABASE_URL as string);
console.log('Connected to Database successfully');

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
