import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { CategoryController } from '../controllers/categories.controller';

export class CategoryRoute implements Routes {
  public path = '/api/v1/categories';
  public router = Router();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getAll);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateCategoryDto), this.categoryController.create);

    this.router.get(`${this.path}/:id`, this.categoryController.getById);

    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateCategoryDto, true), this.categoryController.update);

    this.router.delete(`${this.path}/:id`, this.categoryController.delete);
  }
}
