import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BASEURL}/user/signup`, { name, email, password })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/sign-in");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <section className="signup-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="text-black shadow-lg" style={{ borderRadius: "15px" }}>
              <Card.Body className="p-5">
                <Row className="justify-content-center align-items-center">
                  {/* Form Section */}
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <h2 className="text-center fw-bold mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control
                          type="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button type="submit" variant="primary" size="lg">
                          Register
                        </Button>
                      </div>

                      <div className="text-center mt-3">
                        <p>
                          Already have an account? <Link to="/sign-in">Login</Link>
                        </p>
                      </div>
                    </Form>
                  </Col>

                  {/* Image Section */}
                  <Col lg={5} className="d-none d-lg-flex align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      alt="Sample"
                      className="img-fluid rounded"
                      style={{ maxHeight: "350px" }}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
