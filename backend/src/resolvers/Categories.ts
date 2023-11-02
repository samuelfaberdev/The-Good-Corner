import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryInput } from "../entities/Category";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    const categories = await Category.find({ relations: { ads: true } });
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category> {
    const category = await Category.findOne({
      where: { id },
      relations: { ads: true },
    });

    if (!category) {
      throw new Error("Pas de Category avec cette 'id'");
    }
    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => CategoryInput) data: CategoryInput
  ): Promise<Category> {
    const newCategory = new Category();

    Object.assign(newCategory, data);

    const errors = await validate(newCategory);

    if (errors.length === 0) {
      await newCategory.save();
      return newCategory;
    } else {
      throw new Error(`Validation failed!`);
    }
  }
}
