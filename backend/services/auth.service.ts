import bcrypt from 'bcrypt';
import { IUser } from "../models/User";
import UserService from './user.service';

import { AppError } from '../config/Errorhandler';




const userService = new UserService();
class AuthService {

    async login(email: string, password: string): Promise<IUser> {
        if (!email || !password) {
            throw new AppError('Email and password are required!', 400);
        }

        // check if user exists
        const user: IUser | null = await userService.findByEmail(email);
        if (!user) {
            throw new Error('User not found!');
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        return user;
    }
    
    
    async register(name: string, email: string, password: string): Promise<IUser> {
        if (!name || !email || !password) {
            throw new AppError('Name, email and password are required!', 400);
        }

        // check if user exists
        const user: IUser | null = await userService.findByEmail(email);
        if (user) {
            throw new AppError('User already exists!', 400);
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await userService.createUser(name, email, hashedPassword);

        return newUser;
    }

}

export default AuthService;