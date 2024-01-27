import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CommentService } from '../services/comments.service';
import { Comment } from '../interfaces/comments.interface';
import { CreateCommentDto } from '../dtos/comments.dto';

export class CommentController {
  public commentService = Container.get(CommentService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundComments: Comment[] = await this.commentService.findAllComments();

      res.status(200).json({ data: foundComments, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentId = Number(req.params.id);

      const foundComment: Comment = await this.commentService.findByCommentId(commentId);

      res.status(200).json({ data: foundComment, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentData: CreateCommentDto = req.body;

      const createdComment: Comment = await this.commentService.createComment(commentData);

      res.status(201).json({ data: createdComment, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentId = Number(req.params.id);

      const deletedComment = await this.commentService.deleteComment(commentId);

      res.status(200).json({ data: deletedComment, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
