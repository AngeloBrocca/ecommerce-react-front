import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/new"
          element={<ProductForm />}
        />

        <Route
          path="/products/edit/:id"
          element={<ProductForm />}
        />

      </Routes>

    </BrowserRouter>
  );
}