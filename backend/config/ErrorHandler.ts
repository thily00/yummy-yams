import { Response } from "express";

class AppError extends Error {
    constructor(message: string, public code: number) {
      super(message);
      this.name = 'CustomError';
      this.code = code;
    }
}

function handleError(error: Error, res: Response): void {
    if (error instanceof AppError) {
      res.status(error.code).json({ 
        success: false,
        error: error.message,
        message: error.message,
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: error.message ? error.message :'Internal server error',
        message: error.message ? error.message :'Internal server error', 
      });
    }
}

export  {AppError, handleError};
