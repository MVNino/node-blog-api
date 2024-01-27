import { Routes } from "../interfaces/routes.interface";
import { PostController } from "../controllers/posts.controller";
export declare class PostRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    post: PostController;
    constructor();
    private initializeRoutes;
}
