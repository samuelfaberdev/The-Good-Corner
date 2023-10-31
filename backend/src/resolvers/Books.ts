import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Book, BookInput } from "../entities/Book";

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    id: "1",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    id: "2",
  },
];

@Resolver(Book)
export class BookResolver {
  @Query(() => [Book])
  books() {
    return books;
  }

  @Query(() => Book)
  getBookById(@Arg("id") id: string) {
    return books.find((book) => book.id == id);
  }

  @Mutation(() => Book)
  addBook(@Arg("data") { title, author }: BookInput) {
    const lastId = parseInt(books[books.length - 1].id, 10);
    const id = (lastId + 1).toString();
    books.push({ title, author, id });
    return books.at(-1);
  }
}
