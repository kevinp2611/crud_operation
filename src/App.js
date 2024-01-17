import "./App.css";
import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./Router/my_route";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading"}>
        <Routes>
          {routes.map((route, index) => (
            <Route path={`${route.path}`} Component={route.component} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
