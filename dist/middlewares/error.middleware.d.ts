import { NextFunction, Request, Response } from 'express';
export declare const ErrorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
