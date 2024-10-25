const express = require('express');
const bookRouter = express.Router();
const { createBook, updateBook, deleteBook, fetchBooks, bookById } = require('../controllers/bookController');

// Get all books
bookRouter.get('/book', fetchBooks);

// Get a single book by ID
bookRouter.get('/book/:id', bookById);

// Create a new book
bookRouter.post('/create', createBook);

// Update a book
bookRouter.put('/book/:id', updateBook);


bookRouter.delete('/book/:id', deleteBook);

module.exports = bookRouter;
