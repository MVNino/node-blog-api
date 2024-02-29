import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Author } from '../interfaces/authors.interface';

export type AuthorCreationAttributes = Optional<Author, 'id' | 'postId' | 'firstName' | 'lastName'>;

export class AuthorModel extends Model<Author, AuthorCreationAttributes> implements Author {
  public id?: number;
  public postId: number;
  public firstName!: string;
  public lastName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AuthorModel {
  AuthorModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: 'authors',
      sequelize,
    },
  );

  return AuthorModel;
}
