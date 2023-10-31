import { Length } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  @Length(4, 100, { message: "Entre 4 et 100 caractères" })
  name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads: Ad[];
}
