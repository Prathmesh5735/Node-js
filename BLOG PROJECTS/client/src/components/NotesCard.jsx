import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Button, Col } from "react-bootstrap";

export default function PostCard({ title, body, image, id, getAllUserNotes, UserId }) {
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/notes/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        getAllUserNotes(UserId);
        toast.success(res?.data?.message || "Notes deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Error deleting notes");
      });
  };

  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm border-0">
        <Link to={`/singlepost/${id}`}>
          <Card.Img
            variant="top"
            src={image[0] === "h" ? image : `${import.meta.env.VITE_BASEURL}/${image}`}
            alt="post cover"
            style={{ height: "260px", objectFit: "cover" }}
          />
        </Link>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" title={title} style={{ fontSize: "1.25rem" }}>
            {title}
          </Card.Title>
          <div
            className="d-flex justify-content-between my-2"
            style={{ gap: "0.5rem" }}
          >
            <Button variant="outline-primary" size="sm" as={Link} to={`/updatepost/${id}`}>
              Edit
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </div>
          <Button
            as={Link}
            to={`/singlepost/${id}`}
            variant="outline-primary"
            className="mt-auto"
          >
            Read Article
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
