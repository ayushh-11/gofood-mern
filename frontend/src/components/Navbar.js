import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import Cart from "../components/Cart";
import { useState } from 'react';

function Navbar({ message }) {
    const [cartView, setCartView] = useState(false);
    
    function handleCart(e){
        e.preventDefault();
        setCartView(true);
    }

    
    function handleLogout(e){
        e.preventDefault();
        axios.get("http://localhost:8000/logout")
        .then(res => {
            if (res){
                window.location.href = 'http://localhost:3000'
            }
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active" to="/">Home</Link>
                            </li>
                        </ul>
                        {
                            !message ? (
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-2" aria-current="page" to="/signup">Signup</Link>
                                    <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>
                                </div>
                            )
                                :
                                (
                                <div className='d-flex'> 
                                <Link className="btn bg-white text-success mx-2" to="/orders">My Orders</Link>
                                    {cartView ? <Cart onClose={()=>setCartView(false)}/> : null}
                                     <button className="btn bg-white text-success mx-2" onClick={handleCart}><i class="fa-solid fa-cart-plus"></i>Cart</button>
                                    <button className="btn bg-white text-success mx-2" onClick={handleLogout}>Logout</button>
                                </div> 
                                )
                        }              
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar