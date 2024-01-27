import Sequelize from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '../config';
import PostModel from '../models/posts.model';
import CategoryModel from '../models/categories.model';
import AuthorModel from '../models/authors.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE || '', DB_USER || '', DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    console.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Posts: PostModel(sequelize),
  Categories: CategoryModel(sequelize),
  Authors: AuthorModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
