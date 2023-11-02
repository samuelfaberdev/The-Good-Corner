import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { validate } from "class-validator";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAds() {
    const ads = await Ad.find({ relations: { category: true } });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });

    if (!ad) {
      throw new Error("Pas d'Annonce avec cette 'id'");
    }
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();

    Object.assign(newAd, data);

    const errors = await validate(newAd);

    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Validation failed!`);
    }
  }

  @Mutation(() => Ad)
  async updateAd(
    @Arg("id") id: number,
    @Arg("data", () => AdUpdateInput) data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });

    if (!ad) {
      throw new Error("No Ad with this 'id' !");
    } else {
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
