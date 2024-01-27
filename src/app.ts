import 'reflect-metadata';
import 'dotenv/config';
import express, { Express, Response, Request } from 'express';
import http, { Server } from 'http';
import { DB } from './database';
import { Routes } from './interfaces/routes.interface';
import compression from 'compression';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
// import { stream } from './utils/logger';

export class App {
  private app: Express;
  private env: string;
  private port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = 'development';
    this.port = 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  private async connectToDatabase() {
    await DB.sequelize.sync({ force: false });
  }

  private initializeMiddlewares() {
    // this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
