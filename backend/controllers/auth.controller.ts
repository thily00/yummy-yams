import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { handleError } from '../config/Errorhandler';

const authService = new AuthService();
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        handleError(error, res);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        handleError(error, res);
    }
};