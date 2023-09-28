import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Length, Min, Max } from "class-validator";
import { Category } from "./category";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100, { message: "Entre 4 et 100 caractères" })
  title: string;

  @Column()
  imgSrc: string;

  @Column({ nullable: true })
  @Length(10, 500, { message: "Entre 10 et 500 caractères" })
  description: string;

  @Column()
  @Min(0)
  @Max(1000)
  price: number;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;
}
