import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';   
import { toast } from 'react-toastify';

export default function AppNavbar() {
  const user = JSON.parse(localStorage.getItem('userData'));

  const handleDeleteAllNotes = () => {
    axios
      .delete('http://localhost:8080/notes/deleteallnotes', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message || 'Notes deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message || 'Error deleting notes');
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    toast.success('You have been signed out successfully');
    window.location.href = '/sign-in';
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NotesApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/notes">
              Notes
            </Nav.Link>
            <Nav.Link as={Link} to="/create-notes">
              Create Notes
            </Nav.Link>
          </Nav>

          <Nav>
            {user?.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin">
                  Get All Notes
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleDeleteAllNotes} className="ms-2">
                  Delete All Notes
                </Button>
              </>
            )}
            {user ? (
              <>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="dropdown-user">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s"
                      alt="user"
                      className="rounded-circle"
                      width="30"
                      height="30"
                    />
                  </Dropdown.Toggle>
                </Dropdown>
                <Button variant="outline-secondary" onClick={handleSignOut} className="ms-3">
                  Sign Out
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/sign-in" className="btn btn-outline-primary ms-3">
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
