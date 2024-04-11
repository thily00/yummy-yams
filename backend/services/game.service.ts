import { GameStatus } from '../enums/GameStatus.enum';
import GameReward, { IGameReward } from '../models/GameReward';
import GameSession, {IGameSession} from '../models/GameSession';
import { Rewards } from '../utils/constants';

class GameSessionService {

    async createnewSession(name: string): Promise<IGameSession> {
        const newSession = new GameSession({ name });
        await newSession.save();
        await this.populateRewards(newSession.id);
        return newSession;
    }

    async currentSession(): Promise<IGameSession | null> {
        return await GameSession.findOne({ status: GameStatus.INPROGRESS });
    }

    async populateRewards (sessionId: string): Promise<IGameReward[]> {
        const rewards = Rewards.map(reward => ({
                ...reward,
                gameSession: sessionId
            })
        );

        // return rewards;

        return await GameReward.insertMany(rewards);
    };
}

export default GameSessionService;