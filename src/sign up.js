import React from "react";
import logo from "./Assets/Easylink Logo Full.png";
import { Form } from "./sign up/Form";
import "./sign up/sign up.css";
import "./sign up/HaveAccount";
import { HaveAccount } from "./sign up/HaveAccount";

function App() {
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

export default App;
