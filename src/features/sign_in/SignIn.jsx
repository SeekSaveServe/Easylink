import React from "react";
import logo from '../../Assets/Easylink Logo Full.png';

function SignIn() {
    return (
        <div>
            <div className="left">
                <img src={logo} alt="Logo" style={{width:"20%"}} />

                <p> Sign into</p>
                <p> Your Account </p>

                <form>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email"></input>

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"></input>

                    <label for="remember-me">Remember Me</label>
                    <input type="checkbox" id="remember-me" name="remember-me"></input>

                    <button type="button">Sign In</button>
                </form>
            </div>
            
            
            <div className="right">
                <h1>Join us now!</h1>
                <h1> Discover new opportuniites!</h1>

                <button type="button">Sign Up</button>
            </div>

        </div>
    )
}

export default SignIn;