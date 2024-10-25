import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const BookForm = () => {
  const [book, setBook] = useState({ Title: '', Author: '', Price: '', Description: '', ISBN: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3500/books/create/${id}`)
        .then((res) => setBook(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? axios.put(`http://localhost:3500/books/book/${id}`, book) : axios.post('http://localhost:3500/books/create', book);

    request
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving book:', error));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="Title"
            value={book.Title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="Author"
            value={book.Author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="Price"
            value={book.Price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="Description"
            value={book.Description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            name="ISBN"
            value={book.ISBN}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {id ? 'Update' : 'Add'} Book
        </Button>
      </Form>
    </Container>
  );
};

export default BookForm;
