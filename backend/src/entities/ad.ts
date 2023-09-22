import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length, Min, Max } from "class-validator";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 100, { message: "Entre 4 et 100 caractères" })
  title: string;

  @Column({ nullable: true })
  @Length(20, 500, { message: "Entre 20 et 500 caractères" })
  description: string;

  @Column()
  @Min(0)
  @Max(1000)
  price: number;
}
