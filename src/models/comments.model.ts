import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Comment } from '../interfaces/comments.interface';

export type CommentCreationAttributes = Optional<Comment, 'id' | 'postId' | 'name' | 'content'>;

export class CommentModel extends Model<Comment, CommentCreationAttributes> implements Comment {
  public id?: number;
  public postId: number;
  public name?: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommentModel {
  CommentModel.init(
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
      name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: 'comments',
      sequelize,
    },
  );

  return CommentModel;
}
