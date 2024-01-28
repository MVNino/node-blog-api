import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { AuthController } from '../controllers/auth.controller';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/users.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public controller = new AuthController();
  public path = '/api/v1';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserDto), this.controller.signUp);

    this.router.post(`${this.path}/login`, ValidationMiddleware(CreateUserDto), this.controller.logIn);

    this.router.post(`${this.path}/logout`, AuthMiddleware, this.controller.logOut);
  }
}
