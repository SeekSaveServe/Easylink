import React from "react";
import logo from "./../../Assets/Easylink Logo Full.png";
import { Form } from "./Form";
import { HaveAccount } from "./HaveAccount";

function SignUp() {
  return (
    <>
      <div className="App">
        <HaveAccount />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form />
        </header>
      </div>
    </>
  );
}

export default SignUp;
