import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from "../models/User";
import UserService from './user.service';
import { AppError } from '../config/Errorhandler';
import { HttpStatus } from '../enums/HttpStatus.enum'

const userService = new UserService();
class AuthService {

    async login(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new AppError('Email and password are required!', HttpStatus.BAD_REQUEST);
        }

        const user: IUser | null = await userService.findByEmail(email);
        if (!user) {
            throw new Error('User not found!');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const userId = user.id;
        const userRole = user.role; 
        const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    }
    
    
    async register(name: string, email: string, password: string): Promise<IUser> {
        if (!name || !email || !password) {
            throw new AppError('Name, email and password are required!', HttpStatus.BAD_REQUEST);
        }

        const user: IUser | null = await userService.findByEmail(email);
        if (user) {
            throw new AppError('User already exists!', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userService.createUser(name, email, hashedPassword);
        return newUser;
    }

}

export default AuthService;