import 'reflect-metadata';
import 'dotenv/config';
import express, { Express } from 'express';
import { DB } from './database';
import { Routes } from './interfaces/routes.interface';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { ORIGIN, CREDENTIALS, LOG_FORMAT } from './config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { stream } from './utils/logger';

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
    this.initializeSwagger();
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
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}
