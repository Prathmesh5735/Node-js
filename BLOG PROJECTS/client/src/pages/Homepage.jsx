
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage py-md-5 position-relative">
      <Container>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col lg={6} className="order-md-0 text-center text-lg-start">
            <h5 className="text-uppercase text-warning mb-4">
              Welcome to NotesApp
            </h5>
            <h1 className="display-4 font-weight-bold mb-4">
              Organize Your Ideas, Anytime, Anywhere
            </h1>
            <p className="lead mb-4">
              Your digital notebook for keeping track of everything that matters.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
              <Button href="#" className="btn-primary btn-lg shadow-sm me-3">
                <Link className='text-decoration-none text-light' to="/sign-up">
                Get Started
                </Link>
              </Button>
              <Button href="#" className="btn-neutral btn-lg shadow-sm">
                Learn More
              </Button>
            </div>
          </Col>

          {/* Right Section */}
          <Col lg={6} className="d-none d-lg-block">
            <div className="illustration-container position-relative">
              <img
                src="https://i.pinimg.com/736x/e1/9b/f0/e19bf09954ad5231ad9a89cb8db03ec4.jpg" 
                alt="Notes App Illustration"
                className="img-fluid rounded shadow"
                height={400}
                width={400}
              />
              {/* Decorative Blob */}
              <div className="decorative-blob position-absolute bg-gradient rounded-circle shadow"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
