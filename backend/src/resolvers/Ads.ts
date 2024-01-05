import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { validate } from "class-validator";
import { ContextType } from "../auth";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAds() {
    const ads = await Ad.find({
      relations: { category: true, tags: true, createdBy: true },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });

    if (!ad) {
      throw new Error("Pas d'Annonce avec cette 'id'");
    }
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: ContextType,
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();

    Object.assign(newAd, data, {
      createdBy: context.user,
    });

    const errors = await validate(newAd);

    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Validation failed!`);
    }
  }

  @Authorized()
  @Mutation(() => Ad)
  async updateAd(
    @Ctx() context: ContextType,
    @Arg("id") id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });

    if (context.user?.id !== ad?.createdBy.id) {
      throw new Error("User not authorized to update this ad!");
    }
    if (ad) {
      Object.assign(ad, data);
      const errors = await validate(ad);
      if (errors.length > 0) {
        throw new Error(`Validation failed!`);
      } else {
        await ad.save();
        return await Ad.findOne({
          where: { id },
          relations: { category: true, tags: true },
        });
      }
    } else {
      throw new Error("No Ad with this 'id' !");
    }
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number): Promise<String> {
    const ad = await Ad.findOne({
      where: { id },
    });

    if (!ad) {
      throw new Error(`Ad with 'id = ${id}' does not exist !`);
    } else {
      ad.remove();
      return `Ad with 'id = ${id}' deleted !`;
    }
  }
}
