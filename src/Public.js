import { Outlet,Navigate } from "react-router-dom";

const Public= () => {
    
    const isAuthenticated =
      localStorage.getItem("token") === process.env.REACT_APP_TOKEN;
    console.log("auth", isAuthenticated);

    return isAuthenticated ? <Navigate to="/" /> :  <Outlet />
  };
  export default Public;