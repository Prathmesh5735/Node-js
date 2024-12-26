import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const notesData = { title, body: content };

    axios
      .post(`${import.meta.env.VITE_BASEURL}/notes/create`, notesData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message || "Note created successfully");
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Error creating note");
      });
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Roboto', sans-serif",
  };

  const formStyle = {
    background: "white",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
  };

  const inputStyle = {
    border: "1px solid #ced4da",
    borderRadius: "4px",
    padding: "0.75rem",
    fontSize: "1rem",
    marginBottom: "1rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
    width: "100%",
  };

  const inputFocusStyle = {
    borderColor: "#80bdff",
    boxShadow: "0 0 5px rgba(128, 189, 255, 0.5)",
    outline: "none",
  };

  const buttonStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "white",
    width: "100%",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#343a40" }}>
          Create a Note
        </h1>
        <label style={{ fontWeight: "500", color: "#495057" }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
        />
        <label style={{ fontWeight: "500", color: "#495057" }}>Content</label>
        <textarea
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your content here"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
