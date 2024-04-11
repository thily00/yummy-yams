import { Request, Response } from 'express';
import GameService from '../services/game.service';
import { handleError } from '../config/Errorhandler';

const gameService = new GameService();
export const createNewSession = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const game = await gameService.createnewSession(name);
        res.status(201).json({ 
            success: true, 
            message: 'New session created successfully', 
            data: game 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};

export const curentSession = async (req: Request, res: Response) => {
    try {
        const currentSession = await gameService.currentSession();
        const message = currentSession ? 'Current session fetched successfully' : 'No current session found';
       
        res.status(200).json({ 
            success: true, 
            message: message, 
            data: currentSession 
        });
        
    } catch (error: any) {
        handleError(error, res);
    }
}