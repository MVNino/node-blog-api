import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Post } from "../interfaces/posts.interface";

export type PostCreationAttributes = Optional<
  Post,
  'id' | 'title' | 'description' | 'content'
>;

export class PostModel
  extends Model<Post, PostCreationAttributes>
  implements Post
{
  public id?: number;
  public title!: string;
  public description?: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostModel {
  PostModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "posts",
      sequelize,
    }
  );

  return PostModel;
}
