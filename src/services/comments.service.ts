import { Service } from 'typedi';
import { DB } from '../database';
import { Comment } from '../interfaces/comments.interface';
import { HttpException } from '../exceptions/HttpException';
import { CreateCommentDto } from '../dtos/comments.dto';

@Service()
export class CommentService {
  public async findAllComments(): Promise<Comment[]> {
    return await DB.Comments.findAll();
  }

  public async findByCommentId(commentId: number): Promise<Comment> {
    const foundComment: Comment | null = await DB.Comments.findByPk(commentId);

    if (!foundComment) throw new HttpException(404, "Comment doesn't exist");

    return foundComment;
  }

  public async createComment(commentData: CreateCommentDto): Promise<Comment> {
    return await DB.Comments.create(commentData);
  }

  public async deleteComment(commentId: number): Promise<Comment> {
    const foundComment = await DB.Comments.findByPk(commentId);

    if (!foundComment) throw new HttpException(404, "Comment doesn't exist");

    await DB.Comments.destroy({ where: { id: commentId } });

    return foundComment;
  }
}
