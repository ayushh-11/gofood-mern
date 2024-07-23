import Home from "./screens/Home"
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup"
import Cart from "./components/Cart"
import Order from "./screens/Order"

function App() {
  return (
    <div className="poppins-regular fs-0.4">
      <BrowserRouter >
        <Routes>
          <Route path="/" element = {<Home />}></Route>
          <Route path="/login" element = {<Login />}></Route>
          <Route path="/signup" element = {<Signup />}></Route>
          <Route path="/cart" element = {<Cart />}></Route>
          <Route path="/orders" element = {<Order />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
