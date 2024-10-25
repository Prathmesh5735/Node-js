import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/books/book')
      .then((res) => {
        console.log(res.data)
        setBooks(res.data)})
      .catch(err => console.log(err));
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (

          
          <tr key={book._id}>
            {console.log(book)}
            <td>{book.Title}</td>
            <td>{book.Author}</td>
            <td>${book.Price}</td>
            <td>
              <Link to={`/book/${book._id}`}>
                <Button variant="info" className="me-2">View</Button>
              </Link>
              <Link to={`/edit-book/${book._id}`}>
                <Button variant="warning">Edit</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookList;
