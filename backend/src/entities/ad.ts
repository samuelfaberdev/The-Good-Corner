import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Length, Min, Max } from "class-validator";
import { Category } from "./Category";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { ObjectID } from "./ObjectId";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  @Length(4, 100, { message: "Entre 4 et 100 caractères" })
  title!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imgSrc!: string;

  @Column({ nullable: true })
  @Field()
  @Length(10, 500, { message: "Entre 10 et 500 caractères" })
  description!: string;

  @Column()
  @Field()
  @Min(0)
  @Max(100000)
  price!: number;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category, { nullable: true })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag], { nullable: true })
  tags!: Tag[];

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  createdBy!: User;
}

@InputType()
export class AdCreateInput extends BaseEntity {
  @Field()
  title: string;

  @Field({ nullable: true })
  imgSrc: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field({ nullable: true })
  category: ObjectID;

  @Field({ nullable: true })
  tags: ObjectID;
}

@InputType()
export class AdUpdateInput extends BaseEntity {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  imgSrc: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field({ nullable: true })
  category: ObjectID;

  @Field(() => [ObjectID], { nullable: true })
  tags: ObjectID[];
}
