import { NextFunction, Response } from 'express';
export declare const AuthMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
