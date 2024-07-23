import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    zIndex: 1000 // make sure it overlays above other content
  },
  centeredDiv: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    width: '80%', // Make it wider
    minHeight: '60vh',
    maxWidth: '80%', // Maximum width
    textAlign: 'center',
    transition: 'all 0.3s ease' // Smooth transition for width changes
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  styledTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '40px' // To provide space for the close button
  },
  styledTableTh: {
    borderBottom: '2px solid green',
    padding: '10px',
    textAlign: 'center'
  },
  styledTableTd: {
    borderBottom: '1px solid #ddd',
    padding: '20px 10px'
  }
};

function Cart({ onClose }) {
  const [data, setData] = useState([]);
  var sum = 0;
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8000/cart')
      .then(res => {
        if (res) {
          setData(res.data);
        }
      })
      .catch(err => { throw err })
  }, [])
  function placeOrder(){
    axios.post("http://localhost:8000/order",data)
    .then(res => {
      alert("Order placed");
      onClose();
      setData([]);
    })
    .catch(err => {throw err})
  }

  return (

    <div style={styles.overlay}>

      <div style={styles.centeredDiv}>
        <h1>My Carts <i class="fa-solid fa-cart-plus"></i></h1>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
        {data.length !== 0 ?
        <>
        <table style={styles.styledTable}>
          <thead>
            <tr>
              <th style={styles.styledTableTh}>Item Name</th>
              <th style={styles.styledTableTh}>Quantity</th>
              <th style={styles.styledTableTh}>Total Pice</th>

            </tr>
          </thead>
          <tbody>
            {
            data.map(d => (
              <tr>
                <td style={styles.styledTableTd}>{d.title}</td>
                <td style={styles.styledTableTd}>{d.quantity}</td>
                <td style={styles.styledTableTd}>Rs.{d.price * d.quantity}</td>
                <span style={{ display: 'none' }}>{sum += d.price * d.quantity}</span>
              </tr>
            ))
          }
          </tbody>
        </table>
        
        <div style={{textAlign:'left',marginTop:'5px'}}>
          {sum > 0 ? <div className='fs-1'>Total : Rs.{sum}</div> : null}
          <button className='btn px-3 py-2 bg-success text-white mt-3 text-start' onClick={placeOrder}>Proceed to Payment</button>
        </div>
  </>
      :
      <h1>No Records Found</h1>
    }
      </div>
    </div>
  );
};

export default Cart;
