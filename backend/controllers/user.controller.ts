import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { handleError } from '../config/Errorhandler';
import { HttpStatus } from '../enums/HttpStatus.enum';

const userService = new UserService();
export const me = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const user = await userService.me(userId);
        res.status(HttpStatus.OK).json({ 
            success: true, 
            message: '',
            data: user 
        });
    } catch (error: any) {
        handleError(error, res);
    }
};
