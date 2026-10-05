const express = require("express");

const app = express();

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Java Programming",
    author: "James Gosling",
    price: 500
  },
  {
    id: 2,
    title: "Web Development",
    author: "John Smith",
    price: 450
  }
];

app.get("/", (req, res) => {
  res.send("Book Management API");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author, price } = req.body;

  if (!title || !author || price === undefined) {
    return res.status(400).json({
      message: "Title, author and price are required"
    });
  }

  const newBook = {
    id: books.length
      ? Math.max(...books.map(book => book.id)) + 1
      : 1,
    title,
    author,
    price
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author, price } = req.body;

  if (title !== undefined) {
    book.title = title;
  }

  if (author !== undefined) {
    book.author = author;
  }

  if (price !== undefined) {
    book.price = price;
  }

  res.json({
    message: "Book updated successfully",
    book
  });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const deletedBook = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    book: deletedBook[0]
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});