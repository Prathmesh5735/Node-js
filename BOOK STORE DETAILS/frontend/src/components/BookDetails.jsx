import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:3500/books/book/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) return <div>Loading...</div>; // Display a loading message until book data is loaded

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{book.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.Author}</Card.Subtitle>
          <Card.Text><b>Description</b>  : {book.Description}</Card.Text>
          <Card.Text><strong>Price:</strong> ${book.Price}</Card.Text>
          <Link to="/">
            <Button variant="secondary">Back to List</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetails;
