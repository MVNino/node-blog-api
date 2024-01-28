import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { AuthorController } from '../controllers/authors.controller';
import { CreateAuthorDto, UpdateAuthorDto } from '../dtos/authors.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthorRoute implements Routes {
  public path = '/api/v1/authors';
  public router = Router();
  public authorController = new AuthorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authorController.getAll);

    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateAuthorDto), this.authorController.create);

    this.router.get(`${this.path}/:id`, this.authorController.getById);

    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateAuthorDto, true), this.authorController.update);

    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.authorController.delete);
  }
}
