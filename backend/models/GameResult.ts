import User from './User';
import GameReward from './GameReward';
import GameSession from './GameSession';
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IGameResult extends Document {
  player: string;
  attempts: number;
  gameReward: string;
  gameSession: string;
  win: boolean;
}

const gameResultSchema = new Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    gameSession: { type: mongoose.Schema.Types.ObjectId, ref: GameSession, required: true},
    gameReward: { type: mongoose.Schema.Types.ObjectId, ref: GameReward},
    attempts: { type: Number, required: true, default: 0 },
    win: { type: Boolean, required: true, default: false }
});

export default model<IGameResult>('GameResult', gameResultSchema);