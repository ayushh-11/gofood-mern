import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const formatDateISO = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if necessary
  return `${year}-${month}-${day}`;
};

export default function Order() {
  const [food_items, setFood_items] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:8000/order")
      .then(res => {
        if (res) setFood_items(res.data);
      })
      .catch(err => { throw err; });
  }, []);

  return (
    <>
      <Navbar message={true} />
      
      <div className="container">
        <br></br>
        <h2>My Orders</h2>
        <div className="row">
          {
            food_items.length !== 0 ?
              food_items.map((food, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
                  <div className="card custom-card">
                    <img src={food.img} className="card-img-top" alt={food.name} style={{maxHeight:'200px'}}/>
                    <div className="card-body">
                      <h5 className="card-title">{food.title}</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="fs-6">
                          <h6>Quantity : {food.quantity} Plate</h6>
                          <h6>Price : Rs.{food.price * food.quantity}</h6>
                          <p>Order placed : <b>{formatDateISO(food.date)}</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : <div>No Food Data</div>
          }
        </div>
      </div>

      <Footer />
    </>
  );
}
