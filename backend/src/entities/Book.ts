import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Book {
  @Field()
  id!: string;
  @Field()
  title!: string;
  @Field()
  author!: string;
}

@InputType()
export class BookInput {
  @Field()
  title!: string;

  @Field()
  author!: string;
}
