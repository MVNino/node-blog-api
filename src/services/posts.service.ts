import { Service } from "typedi";
import { DB } from "../database";
import { Post } from "../interfaces/posts.interface";
import { HttpException } from "../exceptions/HttpException";
import { CreatePostDto, UpdatePostDto } from "../dtos/posts.dto";

@Service()
export class PostService {
  public async findAllPosts(): Promise<Post[]> {
    const allPost: Post[] = await DB.Posts.findAll();

    return allPost;
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

    const createPostData: Post = await DB.Posts.create(postData);

    return createPostData;
  }

  public async updatePost(
    postId: number,
    postData: UpdatePostDto
  ): Promise<Post> {
    const findPost: Post = await DB.Posts.findByPk(postId);

    if (!findPost) throw new HttpException(404, "Post doesn't exist");

    const createPostData: Post = await DB.Posts.create(postData);

    return createPostData;
  }

  public async deletePost(postId: number): Promise<Post> {
    const foundPost = await DB.Posts.findByPk(postId);

    if (!foundPost) throw new HttpException(404, "Post doesn't exist");

    await DB.Posts.destroy({ where: { id: postId } });

    return foundPost;
  }
}
