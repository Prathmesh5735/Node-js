import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePost() {
  const [title, setitle] = useState("");
  const [body, setbody] = useState("");
  const [file, setfile] = useState(null);

  const { notesId } = useParams();
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_BASEURL}/notes/update/${notesId}`,
        { title, body, file },
    {
      headers:{
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message || "Notes updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Error updating notes");
      });
  };
  return (
    <div className="container my-5" style={{ maxWidth: "60%" }}>
      <h1 className="text-center">Update Post</h1>
      <Form className="mt-4" onSubmit={handlesubmit}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={(e) => setitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setbody(e.target.value)}
            value={body}
            placeholder="Enter Body Content"
          />
        </Form.Group>

        <Form.Group controlId="file" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            onChange={(e) => setfile(e.target.files[0])}
            type="file"
            accept="image/*"
          />
        </Form.Group>

        <Button variant="primary" className="mt-5 w-100" type="submit">
          Update Post
        </Button>
      </Form>
    </div>
  );
}
