import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NotesCard from "../components/NotesCard";
export default function Notespage() {
  const UserData = JSON.parse(localStorage.getItem("userData"));

  const [notes, setnotes] = useState([]);
  const getAllUserNotes = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/get/${UserData?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setnotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column flex-md-row"
    >
     <h1>Total No Notes is {notes.length}</h1>
      <div className="w-100">
        <h1 className="text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5">
          Notes results:
        </h1>
        {notes.length > 0 ? (
          notes.map((el) => (
            <NotesCard
              key={el._id}
              title={el.title}
              body={el.body}
              image={el.notesImage}
              id={el._id}
              getAllUserNotes={getAllUserNotes}
              UserId={UserData._id}
            />
          ))
        ) : (
          <div className="p-4 d-flex flex-wrap gap-4">
            <p className="text-xl text-gray-500">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
