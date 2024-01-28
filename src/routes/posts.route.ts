import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { PostController } from '../controllers/posts.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreatePostDto, UpdatePostDto } from '../dtos/posts.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class PostRoute implements Routes {
  public path = '/api/v1/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.postController.getAll);

    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreatePostDto), this.postController.create);

    this.router.get(`${this.path}/:id`, this.postController.getById);

    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdatePostDto, true), this.postController.update);

    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.postController.delete);
  }
}
