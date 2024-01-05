import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Ad } from "./Ad";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email!: string;

  @Column()
  @Field()
  hashedPassword!: string;

  @OneToMany(() => Ad, (ad) => ad.createdBy)
  @Field(() => [Ad], { nullable: true })
  ads!: Ad[];
}

@InputType()
export class UserInput extends BaseEntity {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Matches(/^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/)
  password!: string;
}
