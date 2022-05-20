import { React } from 'react';

function Left({ logo, msg, formState, updateState, handleSignIn }) {
    return (
        <div className="left">

                <img src={logo} alt="Logo" style={{width:"20%"}} className="logo"/>
   
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
    )
}

export default Left;