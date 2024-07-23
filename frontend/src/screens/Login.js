import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eemail, setEEmail] = useState("");
  const [epassword, setEPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin(e){
    setEEmail("");
    setEPassword("");
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
        setEEmail("Email is required");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        setEEmail("Email must be valid");
        isValid = false;
    }

    // Password Validation
    if (password.trim() === "") {
        setEPassword("Password is required");
        isValid = false;
    } else if (password.length < 6) {
        setEPassword("Password must be at least 6 characters long");
        isValid = false;
    }
    if(isValid){
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:8000/login", {email, password})
      .then(res => {
        console.log(res.data.message)
        if (res.data.message === "email"){
          setEEmail("Email not found");
        }
        else if (res.data.message === "password"){
          setEPassword("Password donot match");
        }
        else if(res.data.message === "success")
          navigate("/");
      })
    }
  }
  return (
    <div className="container m-5">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)}/>
          {eemail && <div className="alert alert-danger mt-2">{eemail}</div>}
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)}/>
          {epassword && <div className="alert alert-danger mt-2">{epassword}</div>}
        </div>
        <button type="submit" class="btn btn-success" onClick={handleLogin}>Submit</button>
        <Link to="/signup" className="btn m-3 btn-danger">Need an Account ?</Link>
      </form>
    </div>
  )
}

export default Login