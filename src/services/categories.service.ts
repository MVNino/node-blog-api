import { Service } from "typedi";
import { DB } from "../database";
import { Category } from "../interfaces/categories.interface";
import { HttpException } from "../exceptions/HttpException";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/categories.dto";

@Service()
export class CategoryService {
  public async findAllCategories(): Promise<Category[]> {
    return await DB.Categories.findAll();
  }

  public async findByCategoryId(categoryId: number): Promise<Category> {
    const findCategory: Category | null = await DB.Categories.findByPk(categoryId);

    if (!findCategory) throw new HttpException(404, "Category doesn't exist");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const findCategory: Category = await DB.Categories.findOne({
      where: { name: categoryData.name },
    });

    if (findCategory)
      throw new HttpException(
        409,
        `This name ${categoryData.name} already exists`
      );

    return await DB.Categories.create(categoryData);
  }

  public async updateCategory(
    categoryId: number,
    categoryData: UpdateCategoryDto
  ): Promise<Category> {
    const findCategory: Category = await DB.Categories.findByPk(categoryId);

    if (!findCategory) throw new HttpException(404, "Category doesn't exist");

    await DB.Categories.update(categoryData, { where: { id: categoryId } });

    return await DB.Categories.findByPk(categoryId)
  }

  public async deleteCategory(categoryId: number): Promise<Category> {
    const foundCategory = await DB.Categories.findByPk(categoryId);

    if (!foundCategory) throw new HttpException(404, "Category doesn't exist");

    await DB.Categories.destroy({ where: { id: categoryId } });

    return foundCategory;
  }
}
