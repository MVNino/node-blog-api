import { Service } from 'typedi';
import { DB } from '../database';
import { Author } from '../interfaces/authors.interface';
import { HttpException } from '../exceptions/HttpException';
import { CreateAuthorDto, UpdateAuthorDto } from '../dtos/authors.dto';

@Service()
export class AuthorService {
  public async findAllAuthors(): Promise<Author[]> {
    return await DB.Authors.findAll();
  }

  public async findByAuthorId(authorId: number): Promise<Author> {
    const foundAuthor: Author | null = await DB.Authors.findByPk(authorId);

    if (!foundAuthor) throw new HttpException(404, "Author doesn't exist");

    return foundAuthor;
  }

  public async createAuthor(authorData: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName } = authorData;

    const foundAuthor: Author = await DB.Authors.findOne({
      where: { firstName, lastName },
    });

    if (foundAuthor) throw new HttpException(409, `This name ${firstName} ${lastName} already exists`);

    return await DB.Authors.create(authorData);
  }

  public async updateAuthor(authorId: number, authorData: UpdateAuthorDto): Promise<Author> {
    const foundAuthor: Author = await DB.Authors.findByPk(authorId);

    if (!foundAuthor) throw new HttpException(404, "Author doesn't exist");

    await DB.Authors.update(authorData, { where: { id: authorId } });

    return await DB.Authors.findByPk(authorId);
  }

  public async deleteAuthor(authorId: number): Promise<Author> {
    const foundAuthor = await DB.Authors.findByPk(authorId);

    if (!foundAuthor) throw new HttpException(404, "Author doesn't exist");

    await DB.Authors.destroy({ where: { id: authorId } });

    return foundAuthor;
  }
}
