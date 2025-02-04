import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import home from "./core/pages/home/home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<home></home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
