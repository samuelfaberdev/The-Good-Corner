import { Length } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100, { message: "Entre 4 et 100 caractères" })
  name: string;
}
