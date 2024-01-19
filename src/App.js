import "./App.css";
import React, { Suspense, useContext, Component } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from "react-router-dom";
import routes from "./Router/my_route";
import { ctx } from "./context";
import Wrapper from "./Components/user/Wrapper";
import Details from "./Components/userDetails/detaiils";

const App = () => {
  const data = useContext(ctx);

  const Protected = ({ children}) => {
    const isAuthenticated = true;

    return (
      isAuthenticated?children :<h1>hello</h1>
    );
  };

  return (
    <BrowserRouter>
      <Suspense fallback={"Loading"}>
        <Routes>
          <Route path="/" element={<Wrapper />}/>
          <Route path="/user-detail" 
          element={ <Protected>
          <Details />
        </Protected>} />
          {/* {routes.map((route, index) => (
           <Route path={`${route.path}`} Component={route.component} key={index}/>
           ))}  */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
