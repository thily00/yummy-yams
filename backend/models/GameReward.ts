import GameSession from './GameSession';
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IGameReward extends Document {
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
  gameSession: string;
}

const gameRewardSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    quantityWon: { type: Number, required: true },
    gameSession: { type: mongoose.Schema.Types.ObjectId, ref: GameSession, required: true}
});

export default model<IGameReward>('GameReward', gameRewardSchema);