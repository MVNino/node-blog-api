import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { CommentController } from '../controllers/comments.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreateCommentDto } from '../dtos/comments.dto';

export class CommentRoute implements Routes {
  public path = '/api/v1/comments';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.commentController.getAll);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateCommentDto), this.commentController.create);

    this.router.get(`${this.path}/:id`, this.commentController.getById);

    this.router.delete(`${this.path}/:id`, this.commentController.delete);
  }
}
