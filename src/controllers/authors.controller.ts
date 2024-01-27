import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Author } from '../interfaces/authors.interface';
import { CreateAuthorDto, UpdateAuthorDto } from '../dtos/authors.dto';
import { AuthorService } from '../services/authors.service';

export class AuthorController {
  public authorService = Container.get(AuthorService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const foundAuthors: Author[] = await this.authorService.findAllAuthors();

      res.status(200).json({ data: foundAuthors, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorId = Number(req.params.id);

      const foundAuthor: Author = await this.authorService.findByAuthorId(authorId);

      res.status(200).json({ data: foundAuthor, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorData: CreateAuthorDto = req.body;

      const createdAuthor: Author = await this.authorService.createAuthor(authorData);

      res.status(201).json({ data: createdAuthor, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorId = Number(req.params.id);
      const authorData: UpdateAuthorDto = req.body;

      const updatedAuthor: Author = await this.authorService.updateAuthor(authorId, authorData);

      res.status(200).json({ data: updatedAuthor, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorId = Number(req.params.id);

      const deletedAuthor = await this.authorService.deleteAuthor(authorId);

      res.status(200).json({ data: deletedAuthor, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
