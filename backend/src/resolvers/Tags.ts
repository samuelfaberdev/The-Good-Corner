import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagInput } from "../entities/Tag";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getTags() {
    const tags = await Tag.find();
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number): Promise<Tag> {
    const tag = await Tag.findOne({
      where: { id },
      relations: { ads: true },
    });

    if (!tag) {
      throw new Error("Pas de Tag avec cette 'id'");
    }
    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Arg("data", () => TagInput) data: TagInput): Promise<Tag> {
    const newTag = new Tag();

    Object.assign(newTag, data);

    const errors = await validate(newTag);

    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Validation failed!`);
    }
  }
}
