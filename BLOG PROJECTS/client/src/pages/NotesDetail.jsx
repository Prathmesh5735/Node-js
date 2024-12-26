import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { notesId } = useParams();
  const [notes, setNotes] = useState({});
  const [isLoading, setLoading] = useState(false);

  console.log(isLoading);
  const getAllUserNotes = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/singleNotes/${notesId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);
  return isLoading ? (
    <h1>Loaidng..</h1>
  ) : (
    <div className="container my-4">
      {/* Blog Post Section */}
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="text-center">
              {/* Placeholder for blog post image */}
              {!isLoading ? (
                <img
                  src={`${import.meta.env.VITE_BASEURL}/${notes?.notesImage}`}
                  alt="Blog Title"
                  className="img-fluid rounded mb-3"
                  height={600}
                  width={600}
                />
              ) : (
                "wait.."
              )}
              {/* Placeholder for blog title */}
              <h2>{notes.title}</h2>

              {/* Placeholder for blog content */}
              <div className="blog-content">{notes.body}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
