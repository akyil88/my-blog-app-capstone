import React, { useState, ChangeEvent } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import "../RegisterPage/Register.css";

const Register: React.FC = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    return (
        <>
            <Header />
            <section className="register">
                <div className="container">
                    <h2>Sign Up</h2>
                    <form className="form register_form">
                        <input type="text" placeholder="Full Name" name="name" value={userData.name} onChange={changeInputHandler} autoFocus />
                        <input type="text" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler} />
                        <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
                        <input type="password" placeholder="Confirm Password" name="password2" value={userData.password2} onChange={changeInputHandler} />
                        <button type="submit" className="btn primary">Register</button>
                    </form>
                    <small>Already have an account? <Link to="/login">sign in</Link></small>
                </div>
            </section>
        </>
    );
};

export default Register
