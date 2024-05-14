import User, {IUser} from '../models/User';
import { Rewards } from '../utils/constants';
import { AppError } from '../config/Errorhandler';
import { GameStatus } from '../enums/GameStatus.enum';
import { HttpStatus } from '../enums/HttpStatus.enum';
import GameReward, { IGameReward } from '../models/GameReward';
import GameResult, { IGameResult } from '../models/GameResult';
import GameSession, {IGameSession} from '../models/GameSession';
import { rollDice, checkWinningCombination } from '../utils/utils';

class GameService {

    async createnewSession(name: string): Promise<IGameSession> {
        if(!name){
            throw new AppError('Name is required', HttpStatus.BAD_REQUEST);
        }

        const newSession = new GameSession({ name });
        await newSession.save();
        await this.populateRewards(newSession.id);
        return newSession;
    }

    async getAllSessions(): Promise<IGameSession[] | []> {
        return await GameSession.find();
    }

    async getActiveSessions(): Promise<IGameSession[] | []> {
        return await GameSession.find({ status: GameStatus.INPROGRESS });
    }

    async updateSession(sessionId: string, updateFields: Partial<IGameSession>): Promise<IGameSession | any> {
       
        const session: IGameSession | null = await GameSession.findByIdAndUpdate(sessionId, updateFields);
        if(!session){
            throw new AppError('Session not found', HttpStatus.NOT_FOUND);
        }
        return session;
    }

    async playGame(sessionId: string, playerId: string): Promise<IGameReward | any> {
        if(!sessionId || !playerId){
            throw new AppError('SessionId and playerId are required', HttpStatus.BAD_REQUEST);
        }

        const player: IUser | null = await User.findById(playerId);
        if (!player) {
            throw new AppError('Player not found', HttpStatus.NOT_FOUND);
        }

        const session: IGameSession | null = await GameSession.findById(sessionId);
        if (!session || (session && session.status === GameStatus.FINISHED)) {
            throw new AppError('Game session not found or is ended', HttpStatus.NOT_FOUND);
        }

        let playerResult: IGameResult | null = await GameResult.findOne({ player: playerId, gameSession: sessionId });
        if(!playerResult) {
            playerResult = new GameResult({ player: playerId, gameSession: sessionId, attempts: 3, win: false });
        }
            
        if(playerResult && playerResult.attempts <= 0) {
            throw new AppError('Player has exhausted all attempts', HttpStatus.OK);
        }

        if(playerResult && playerResult.win) {
            throw new AppError('Player has already won', HttpStatus.OK);
        }

        const dices = rollDice();
        const win = checkWinningCombination(dices);

        if(!win){
            playerResult.attempts -= 1;
        }else{
            playerResult.win = true;
        }

        await playerResult.save();
        return [playerResult, dices];
    }

    async populateRewards (sessionId: string): Promise<IGameReward[]> {
        const rewards = Rewards.map(reward => ({
                ...reward,
                gameSession: sessionId
            })
        );
        return await GameReward.insertMany(rewards);
    };
}

export default GameService;