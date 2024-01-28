import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { UserRoute } from '../routes/users.route';
import { CreateUserDto } from '../dtos/users.dto';
import { AuthRoute } from '../routes/auth.route';
import { App } from '../app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const userRoute = new UserRoute();
      const users = userRoute.userController.userService;

      users.findUserById = jest.fn().mockReturnValue(null);
      users.createUser = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const authRoute = new AuthRoute();

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const userRoute = new UserRoute();
      const users = userRoute.userController.userService;

      users.findUserById = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const authRoute = new AuthRoute();

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const authRoute = new AuthRoute();

      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}logout`)
        .expect('Set-Cookie', /^Authorization=\;/);
    });
  });
});
