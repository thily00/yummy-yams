import { Schema, model, Document } from 'mongoose';
import { GameStatus } from '../enums/GameStatus.enum';

export interface IGameSession extends Document {
  name: string;
  status: string;
}

const gameSessionSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, default: GameStatus.INPROGRESS }
});


export default model<IGameSession>('GameSession', gameSessionSchema);