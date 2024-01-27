import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { AuthorController } from '../controllers/authors.controller';
import { CreateAuthorDto, UpdateAuthorDto } from '../dtos/authors.dto';

export class AuthorRoute implements Routes {
  public path = '/authors';
  public router = Router();
  public authorController = new AuthorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authorController.getAll);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateAuthorDto), this.authorController.create);

    this.router.get(`${this.path}/:id`, this.authorController.getById);

    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateAuthorDto, true), this.authorController.update);

    this.router.delete(`${this.path}/:id`, this.authorController.delete);
  }
}
