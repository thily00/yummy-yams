import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { handleError } from '../config/ErrorHandler';
import { HttpStatus } from '../enums/HttpStatus.enum';

const authService = new AuthService();
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.status(HttpStatus.OK).json({ 
            success: true, 
            message: 'User logged in successfully',
            data: data 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(HttpStatus.CREATED).json({ 
            success: true, 
            message: 'User registered successfully',
            data: user 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};