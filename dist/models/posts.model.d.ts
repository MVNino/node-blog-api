import { Sequelize, Model, Optional } from "sequelize";
import { Post } from "../interfaces/posts.interface";
export type PostCreationAttributes = Optional<Post, 'id' | 'title' | 'description' | 'content'>;
export declare class PostModel extends Model<Post, PostCreationAttributes> implements Post {
    id?: number;
    title: string;
    description?: string;
    content: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default function (sequelize: Sequelize): typeof PostModel;
