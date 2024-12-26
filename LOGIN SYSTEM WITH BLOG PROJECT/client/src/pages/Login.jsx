import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post(`${import.meta.env.VITE_BASEURL}/user/login`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
        localStorage.setItem("userData", JSON.stringify(res.data.userData));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1710162734135-8dc148f53abe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="p-4 shadow-lg" style={{ opacity: 0.95 }}>
              <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                <p className="text-center text-muted mb-4">Access your account</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Your password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 btn-primary">
                    Sign In
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <span> Don't have an account? </span>
                  <Link to="/sign-up" className="text-primary">
                    Sign Up
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
