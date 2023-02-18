import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ProductAdd from "./Pages/ProductAdd";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path={"/addproduct"} element={<ProductAdd></ProductAdd>}></Route>
        <Route path="/delete" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
