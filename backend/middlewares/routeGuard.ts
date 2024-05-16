import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../enums/HttpStatus.enum';

require('dotenv').config();
const secretKey = process.env.JWT_SECRET as string;
const userRoles: any = {
    admin: true,
    player: true,
};

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    try {
        const token = extractTokenFromHeader(authHeader);
        const decoded = jwt.verify(token as string, secretKey);
      
        (req as any).userId = (decoded as any).userId;
        (req as any).role = (decoded as any).userRole;

        next(); 
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Token is not valid' });
  }
}


function roleAuthorization(roles: string[]) {
    return (req: Request, res:Response, next: NextFunction) => {
      const role = (req as any).role; 
      
      if (role && userRoles[role] && roles.includes(role)) {
        next();
      } else {
        res.status(HttpStatus.FORBIDDEN).send('Non autorisé');
      }
    };
}

function extractTokenFromHeader(header: string): string | null {
    if (header && header.startsWith('Bearer ')) {
        return header.slice(7);
    }
    return null;
}

export  { isAuthenticated, roleAuthorization };