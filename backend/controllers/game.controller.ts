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

export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await gameService.getAllSessions();
        const message = sessions.length >0 ? 'Currents session fetched successfully' : 'No current session found';
       
        res.status(200).json({ 
            success: true, 
            message: message, 
            data: sessions 
        });
        
    } catch (error: any) {
        handleError(error, res);
    }
}

export const getActiveSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await gameService.getActiveSessions();
        const message = sessions.length >0 ? 'Active session fetched successfully' : 'No active session found';
       
        res.status(200).json({ 
            success: true, 
            message: message, 
            data: sessions 
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
        const { sessionId, playerId } = req.body;
        const result = await gameService.playGame(sessionId, playerId);
        
        let message = result[0].win ? 'Congratulations! You won' : 'You lost';
        let response = {
            attempts: result[0].attempts,
            result: result[1],
            win: result[0].win
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