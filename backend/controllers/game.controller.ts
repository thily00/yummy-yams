import { Request, Response } from 'express';
import GameService from '../services/game.service';
import { handleError } from '../config/ErrorHandler';

const gameService = new GameService();
export const createNewSession = async (req: Request, res: Response) => {
    try {
        const game = await gameService.createnewSession();
        res.status(201).json({ 
            success: true, 
            message: 'New session created successfully', 
            data: game 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};

export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await gameService.getAllSessions();
        const message = sessions.length > 0 ? 'Currents session fetched successfully' : 'No current session found';
       
        res.status(200).json({ 
            success: true, 
            message: message, 
            data: sessions 
        });
        
    } catch (error: any) {
        handleError(error, res);
    }
}

export const getActiveSession = async (req: Request, res: Response) => {
    try {
        const playerId = (req as any).userId;
        const session = await gameService.getActiveSession(playerId);
        const message = session ? 'Active session fetched successfully' : 'No active session found';
       
        res.status(200).json({ 
            success: true, 
            message: message, 
            data: session
        });
        
    } catch (error: any) {
        handleError(error, res);
    }
}

export const updateSession = async (req: Request, res: Response) => {
    try {
        const sessionId = req.params.id;
        const updateFields = req.body;
        const session = await gameService.updateSession(sessionId, updateFields);
        res.status(200).json({ 
            success: true, 
            message: 'Session updated successfully', 
            data: session 
        });
    } catch (error: any) {
        handleError(error, res);
    }
}


export const playGame = async (req: Request, res: Response) => {
    try {
        const { sessionId} = req.body;
        const playerId = (req as any).userId;
        const result = await gameService.playGame(sessionId, playerId);
        
        let message = result[0].win ? 'Congratulations! You won' : 'You lost';
        let response = {
            attempts: result[0].attempts,
            result: result[2],
            win: result[0].win,
            rewardName: result[1] !== null ? result[1].name : null
        }

        res.status(200).json({ 
            success: true, 
            message: message, 
            data: response
        });
    } catch (error: any) {
        handleError(error, res);
    }
};


export const getSessionResult = async (req: Request, res: Response) => {
    try {
        const sessionId = req.params.id;
        const result = await gameService.getSessionResult(sessionId);
        res.status(200).json({ 
            success: true, 
            message: 'Session result fetched successfully', 
            data: result 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};