import { Schema, model, Document } from 'mongoose';
import { Role } from '../enums/User.enum';

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true, default: Role.PLAYER }
});


export default model<IUser>('User', userSchema);