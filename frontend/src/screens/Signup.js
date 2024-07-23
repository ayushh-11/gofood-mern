import React, { useState } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [ename, setEName] = useState("");
    const [eemail, setEEmail] = useState("");
    const [epassword, setEPassword] = useState("");
    const [ecpassword, setECPassword] = useState("");
    const [eaddress, setEAddress] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
        axios.defaults.withCredentials = true;
        let isValid = true;

        // Full Name Validation
        if (name.trim() === "") {
            setEName("Full name is required");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            setEName("Invalid Name");
            isValid = false;
        }

        // Email Validation
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
        } else if (password !== cpassword) {
            setEPassword("Passwords do not match");
            isValid = false;
        }

        // Confirm Password Validation
        if (cpassword.trim() === "") {
            setECPassword("Confirm password is required");
            isValid = false;
        } else if (password !== cpassword) {
            setECPassword("Passwords do not match");
            isValid = false;
        } else {
            setECPassword("");
        }
        ///address validation
        if (address.trim() === "") {
            setEAddress("Address is required");
            isValid = false;
        } 
        if (isValid) {
            console.log(name+" Form is valid");
            // Perform the form submission or other actions here
            axios.post("http://localhost:8000/createUser",{name, email, password, address})
            .then(res => {
                console.log("Responded and added");
                alert("User Created. Login to continue")
            })
            .catch(err => console.log(err))
        } else {
            console.log("Form has errors");
        }

    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    {ename && <div className="alert alert-danger mt-2">{ename}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    {eemail && <div className="alert alert-danger mt-2">{eemail}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {epassword && <div className="alert alert-danger mt-2">{epassword}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="cpassword"
                        onChange={e => setCPassword(e.target.value)}
                        required
                    />
                    {ecpassword && <div className="alert alert-danger mt-2">{ecpassword}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="string"
                        className="form-control"
                        name="address"
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                    {eaddress && <div className="alert alert-danger mt-2">{eaddress}</div>}
                </div>
                <button type="submit" className="btn btn-success m-3">Submit</button>
                <Link to="/login" className="btn m-3 btn-danger">Alread a user ?</Link>
            </form>
        </div>
    );
}

export default Signup;
