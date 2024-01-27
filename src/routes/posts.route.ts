import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { PostController } from "../controllers/posts.controller";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { CreatePostDto, UpdatePostDto } from "../dtos/posts.dto";

export class PostRoute implements Routes {
  public path = "/posts";
  public router = Router();
  public post = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.post.getAll);

    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreatePostDto),
      this.post.create
    );

    this.router.get(`${this.path}/:id`, this.post.getById);

    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(UpdatePostDto, true),
      this.post.update
    );

    this.router.delete(`${this.path}/:id`, this.post.delete);
  }
}
