import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Card({message}) {
    const [food_items, setFoodItems] = useState([]);
    const [food_category, setFoodCategory] = useState([]);
    
    const[quantity, setQuantity] = useState({});
    const [search, setSearch] = useState("");

    function handleQuantity(value,index){
        
        setQuantity(prevQuantities => ({
            ...prevQuantities,
            [index]: value
        }));
        console.log(quantity);
    }
    function handleCart( food, quant ) {
        axios.defaults.withCredentials = true;
        
        var   title = food.name
        var   quantity = quant
        var   price = food.options[0].full
        var img = food.img
        
        axios.post("http://localhost:8000/cart",{title, quantity, price, img})
        .then(res => {
            if (res)
                alert("Items added");
        })
        .catch(err => {throw err})
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/index')
            .then(res => {
                setFoodItems(res.data[0]);
                setFoodCategory(res.data[1]);
            })
            .catch(err => console.error(err));
    }, []); // Add an empty dependency array
    return (
        <div>
            <div id="carouselExample" className="carousel slide">

                <div className="carousel-inner" id="carousel">
                    <div class="carousel-caption" style={{ zIndex: "2" }}>
                        <form class="d-flex">
                            <input onChange={e=>setSearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-success" type="submit">Search</button>
                        </form>

                    </div>
                    <div className="carousel-item active">
                        <img src="/f1.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/f2.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/f3.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container">
                <div className="row">
                    {
                        food_category.length !== 0 ?
                            food_category.map(data => (
                                <div key={data._id} className="col-12 mt-3">
                                    <h1 className='fs-1'>{data.CategoryName}</h1>
                                    <hr />
                                    <div className="row">
                                        {
                                            food_items.length !== 0 ?
                                                food_items.filter(item => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                    .map((food, index) => (
                                                        <div key={index} className="col-12 col-md-6 col-lg-3 my-3">
                                                            <div className="card mt-3" style={{ width: "100%", maxHeight: "450px" }}>
                                                                <img src={food.img} className="img-fluid" alt={food.name} style={{ maxHeight: "210px" }} />

                                                                <div className="card-body">
                                                                    <h5 className="card-title">{food.name}</h5>
                                                                    <p className="card-text">{food.description}</p>
                                                                    
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <select className="btn px-3 py-2 bg-success text-white"  onChange={(e) => handleQuantity(e.target.value,index)}>;
                                                                            {Array.from(Array(6), (e, i) => (
                                                                                <option key={i + 1} value={i + 1} >{i + 1}</option>
                                                                            ))}
                                                                        </select>
                                                                       
                                                                        <div className="fs-5">
                                                                            Price : {food.options[0].full * (quantity[index] || 1)}
                     
                                                                        </div>
                                                                    </div>
                                                                    {message ? <button className='btn px-3 py-2 bg-success text-white my-2 w-100' onClick={()=>handleCart(food, (quantity[index] || 1))}>
                                                                            Add to Cart &nbsp;
                                                                         <i class="fa-solid fa-cart-plus"></i>
                                                                    </button> : null}
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div>No Food Data</div>
                                        }
                                    </div>
                                </div>
                            ))
                            : <div>No Category</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;
