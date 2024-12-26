import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import SignUp from "./pages/Singup";
import Homepage from "./pages/Homepage";
import Notespage from "./pages/Notespage";
import CreatePost from "./pages/NotesCreate";
import BlogDetail from "./pages/NotesDetail";
import PrivateRoutes from "./components/Privateroutes";
import UpdatePost from "./pages/UpdatePost";
import AdminNotes from "./pages/AdminNotes";
const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/notes"
        element={
          <PrivateRoutes>
            <Notespage />
          </PrivateRoutes>
        }
      ></Route>
      <Route path="/create-notes" element={
        <PrivateRoutes>
        <CreatePost />
        </PrivateRoutes>
        }></Route>
      <Route path="/singlepost/:notesId" element={<BlogDetail />}></Route>
      <Route path="/updatepost/:notesId" element={<UpdatePost />}></Route>
      <Route path="/admin" element={<AdminNotes />}></Route>
    </Routes>
  );
};

export default Allroutes;
