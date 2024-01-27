import 'reflect-metadata';
import "dotenv/config";
import { Routes } from "./interfaces/routes.interface";
export declare class App {
    private app;
    private env;
    private port;
    constructor(routes: Routes[]);
    listen(): void;
    private connectToDatabase;
    private initializeMiddlewares;
    private initializeRoutes;
}
