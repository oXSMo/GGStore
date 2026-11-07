
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layouts/NavBar";
import Home from "./pages/Home";

import AdminDash from "./admin/AdminDash";
import Product from "./admin/pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDash />}>
          <Route index element={<h1>Admin Dashboard</h1>} />
       
          <Route path="products" element={<Product />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
