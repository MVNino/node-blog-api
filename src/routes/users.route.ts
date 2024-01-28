import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { UserController } from '../controllers/users.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/users.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(AuthMiddleware);

    this.router.get(`${this.path}`, this.userController.getAll);
    this.router.get(`${this.path}/:id(\\d+)`, this.userController.getById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.userController.create);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto, true), this.userController.update);
    this.router.delete(`${this.path}/:id(\\d+)`, this.userController.delete);
  }
}
