import React from "react";
import logo from "./../../Assets/Easylink Logo Full.png";
import "./sign up.css";
import Left from "./Left";
import Right from "./Right";

function SignUp() {
  return (
    <>
      <div className="App">
        <Left />
        <Right logo={logo} />
      </div>
    </>
  );
}

export default SignUp;
