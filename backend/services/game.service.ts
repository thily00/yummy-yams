import User, {IUser} from '../models/User';
import { Rewards } from '../utils/constants';
import { AppError } from '../config/Errorhandler';
import { GameStatus } from '../enums/GameStatus.enum';
import { HttpStatus } from '../enums/HttpStatus.enum';
import GameReward, { IGameReward } from '../models/GameReward';
import GameResult, { IGameResult } from '../models/GameResult';
import GameSession, {IGameSession} from '../models/GameSession';
import { rollDice, checkWinningCombination } from '../utils/utils';


interface IActiveSession {
    session: IGameSession;
    attempts: number;
    win: boolean;
    rewardName: undefined | null | string;
}

class GameService {

    async createnewSession(): Promise<IGameSession> {
        const name = `Session-${Date.now()}`;

        const activeSession: IGameSession | null = await GameSession.findOne({ status: GameStatus.INPROGRESS });
        if (activeSession) {
            throw new AppError('There is an active session already', HttpStatus.CONFLICT);
        }

        const newSession = new GameSession({ name });
        await newSession.save();
        await this.populateRewards(newSession.id);
        return newSession;
    }

    async getAllSessions(): Promise<IGameSession[] | []> {
        return await GameSession.find();
    }

    async getActiveSession(playerId: string): Promise<Partial<IActiveSession> | null> {
        let rewardName: string | undefined | null = null;
        let res: Partial<IActiveSession> | null = null;
        let activeSession: IGameSession | null = await GameSession.findOne({ status: GameStatus.INPROGRESS });
        if(!activeSession) {
            return res;
        }

        let playerResult = await GameResult.findOne({ player: playerId, gameSession: activeSession._id });

        if(playerResult && playerResult.gameReward){
            const gameReward = await GameReward.findById(playerResult.gameReward);
            rewardName = gameReward?.name;
        }
        
        if(!playerResult){
            playerResult = new GameResult({ player: playerId, gameSession: activeSession.id, attempts: 3, win: false});
            playerResult.save();
        }
        
        res = {
            session: activeSession,
            attempts: playerResult.attempts,
            win: playerResult.win,
            rewardName: rewardName
        };
 
        return res;
    }

    async updateSession(sessionId: string, updateFields: Partial<IGameSession>): Promise<IGameSession | any> {
        const session: IGameSession | null = await GameSession.findByIdAndUpdate(sessionId, updateFields);
        if(!session){
            throw new AppError('Session not found', HttpStatus.NOT_FOUND);
        }
        return session;
    }

    async getUserResult(sessionId: string, playerId: string): Promise<IGameResult | any> {
        return await GameResult.findOne({ player: playerId, gameSession: sessionId });
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

        let playerResult: IGameResult | null = await GameResult.findOne({ player: playerId, gameSession: sessionId }).populate('gameReward');
        
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
        let reward: IGameReward | null = null;
        if(!win){
            playerResult.attempts -= 1;
        }else{
            playerResult.win = true;
            reward = await this.pickRandomReward(sessionId);
            if(reward){
                playerResult.gameReward = reward.id;
            }
        }

        await playerResult.save();
        return [playerResult,reward, dices];
    }

    async getSessionResult(sessionId: string): Promise<IGameResult[]> {
        return await GameResult.find({ gameSession: sessionId })
                                .populate('gameReward')
                                .populate('player')
                                .populate('gameSession');
    }

    async populateRewards (sessionId: string): Promise<IGameReward[]> {
        const rewards = Rewards.map(reward => ({
                ...reward,
                gameSession: sessionId
            })
        );
        return await GameReward.insertMany(rewards);
    };

    async pickRandomReward(sessionId: string): Promise<IGameReward | null> {
        const reward: IGameReward | null = await GameReward.findOne({ gameSession: sessionId, stock: { $gt: 0} });
        if(reward){
            reward.stock -= 1;
            return await reward.save();        
        }else{
            return null;
        }
    }
}

export default GameService;