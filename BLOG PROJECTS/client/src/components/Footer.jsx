import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start py-3">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">
            &copy; {new Date().getFullYear()} NotesApp
          </span>
          <div>
            <a href="#" className="footer-link mx-2">
              Privacy Policy
            </a>
            <a href="#" className="footer-link mx-2">
              Terms of Service
            </a>
            <a href="#" className="footer-link mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
