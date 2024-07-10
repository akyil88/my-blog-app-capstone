import React, {useState, ChangeEvent} from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import "../RegisterPage/Register.css";

const Login: React.FC = () => {

    const [userData, setUserData] = useState({

        email: "",
        password: ""

    });

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    return (
        <>
            <Header/>
            <section className="login">
                <div className="container">
                    <h2>Sign In</h2>
                    <form className="form login_form">

                        <input type="text" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler}/>
                        <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler}/>
                        <button type="submit" className="btn primary">Login</button>
                    </form>
                    <small>Don't have an account? <Link to="/register">sign up</Link></small>
                </div>
            </section>
        </>
    )
}

export default Login
