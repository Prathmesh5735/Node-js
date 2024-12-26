import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const PrivateRoutes = ({ children }) => {
  //   let isAuth = true;
  const [cookies] = useCookies(["verificationToken"]);
  const isAuth = cookies.verificationToken;
console.log(isAuth);
  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoutes;
