import { Outlet,Navigate } from "react-router-dom";

const Protected = () => {
    


    const isAuthenticated =
      localStorage.getItem("token") !== process.env.REACT_APP_TOKEN;
    console.log("auth", isAuthenticated);

    return isAuthenticated ? <Navigate to="/login" /> : <Outlet />
  };
  export default Protected;