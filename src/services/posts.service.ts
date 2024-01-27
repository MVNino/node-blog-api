import { Service } from "typedi";
import { DB } from "../database";
import { Post } from "../interfaces/posts.interface";
import { HttpException } from "../exceptions/HttpException";
import { CreatePostDto, UpdatePostDto } from "../dtos/posts.dto";

@Service()
export class PostService {
  public async findAllPosts(): Promise<Post[]> {
    return await DB.Posts.findAll();
  }

  public async findByPostId(postId: number): Promise<Post> {
    const findPost: Post | null = await DB.Posts.findByPk(postId);

    if (!findPost) throw new HttpException(404, "Post doesn't exist");

    return findPost;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    const findPost: Post = await DB.Posts.findOne({
      where: { title: postData.title },
    });

    if (findPost)
      throw new HttpException(
        409,
        `This title ${postData.title} already exists`
      );

    return await DB.Posts.create(postData);
  }

  public async updatePost(
    postId: number,
    postData: UpdatePostDto
  ): Promise<Post> {
    const findPost: Post = await DB.Posts.findByPk(postId);

    if (!findPost) throw new HttpException(404, "Post doesn't exist");

    await DB.Posts.update(postData, { where: { id: postId } });

    return await DB.Posts.findByPk(postId)
  }

  public async deletePost(postId: number): Promise<Post> {
    const foundPost = await DB.Posts.findByPk(postId);

    if (!foundPost) throw new HttpException(404, "Post doesn't exist");

    await DB.Posts.destroy({ where: { id: postId } });

    return foundPost;
  }
}
