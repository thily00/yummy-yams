import express, { Express } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', authRoutes);

mongoose.connect('mongodb://db:27017/mydatabase');
console.log('Connected to Database successfully');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
