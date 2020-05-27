import { Router } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Book } from "./types.ts";

const router = new Router();

let books: Book[] = [
  {
    id: "1",
    title: "Book One",
    author: "One",
  },
  {
    id: "2",
    title: "Book Two",
    author: "Two",
  },
  {
    id: "3",
    title: "Book Three",
    author: "Three",
  },
];

router.get("/", (context) => {
  context.response.body = "you are in the landing page right now";
})
  .get("/books", (context) => {
    context.response.body = books;
    context.response.status = 200;
  })
  .post("/book", async (context) => {
    const body = await context.request.body();

    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = "No data";
    } else {
      //so if we got the body
      // first we need to generate the Id
      //  with Id, title , author that come from the client
      // we need to put them inside the books array

      const book: Book = body.value;
      book.id = v4.generate();
      books.push(book);
      context.response.status = 200;
      context.response.body = book;
    }
  })
  .get("/book/:id", (context) => {
    //need to find the book that has id which is same as param value
    const book: Book | undefined = books.find((b) =>
      b.id === context.params.id
    );

    if (book) {
      context.response.body = book;
      context.response.status = 200;
    } else {
      context.response.body = "Not Found";
      context.response.status = 404;
    }
  });

export default router;
