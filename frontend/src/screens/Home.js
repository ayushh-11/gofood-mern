import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Home() {
    const [auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/index")
        .then(res => {
            if (res.data[2] === true){
                console.log(res.data[2])
                setAuth(true);
            }
        })
    },[])
    return (
        <div>
            <Navbar message={auth}/>
            <Card message={auth}/>
            <Footer />
        </div>
    )
}

export default Home