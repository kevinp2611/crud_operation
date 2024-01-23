import "./App.css";
import React, { Suspense, useContext } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import {Privateroutes} from "./Router/my_route";
import {Publicroutes} from "./Router/my_route"
import { ctx } from "./context";
import Protected from "./Protected";
import Public from "./Public";

const App = () => {
  const data = useContext(ctx);

  return (
    <BrowserRouter>
      <Suspense fallback={"Loading"}>
        <Routes>
          {/* <Route element={<Protected />}>
            <Route element={<Wrapper />} path="/" exact />
            <Route element={<Details />} path="/userDetails" />
          </Route>
          <Route element={<Public />}>
            <Route element={<Login />} path="/login" />
            </Route> */}
            <Route element={<Protected />}>
          {Privateroutes.map((route, index) => (
           <Route path={`${route.path}`} Component={route.component} key={index}/>
           ))} 
             </Route>
             <Route element={<Public />}>

             {Publicroutes.map((route, index) => (
           <Route path={`${route.path}`} Component={route.component} key={index}/>
           ))} 

             </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
