import { useState, React} from "react";
import logo from '../../Assets/Easylink Logo Full.png';
import './signIn.css';

function SignIn() {
    const [formState, setFormState] = useState({email: "", password: ""});
    const [msg, setMsg] = useState("Your Account");

    function updateState(evt){
        setFormState({
            ...formState,
            [evt.target.getAttribute('name')]: evt.target.value
        });
    }

    function clearState() {
        const newObj = {};
        for (const key of Object.keys(formState)) {
            newObj[key] = "";
        }
        setFormState(newObj);
    }
   
    function handleSignIn(evt) {
        setMsg(`Welcome, ${formState["email"]}`);
        clearState();
    }

    return (
        <div className="page">
            <div className="left">
                <img src={logo} alt="Logo" style={{width:"20%"}} className="App-logo"/>

                <h1 className="sign_into"> Sign into</h1>
                <h4 className="your_account"> {msg} </h4>

                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formState.email}
                        onChange={updateState}
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formState.password}
                        onChange={updateState}
                    ></input>

                    <div style={{marginBottom: "1rem"}}>
                        <input type="checkbox" id="remember-me" name="remember-me"></input>
                        <label htmlFor="remember-me">Remember Me</label>
                    </div>

                    <button type="button" onClick={handleSignIn}>Sign In</button>
                </form>
            </div>
            
            
            <div className="right">
                <h1 className="join">Join us now!</h1>
                <h1 className="discover"> Discover new opportunities!</h1>

                <button type="button">Sign Up</button>
            </div>

        </div>
    )
}

export default SignIn;