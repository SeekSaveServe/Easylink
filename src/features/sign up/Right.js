import { useState } from "react";
import { React } from "react";
import { Form } from "./Form";

function Right({ logo }) {
  return (
    <div className="left">
      <img src={logo} alt="Logo" style={{ width: "20%" }} className="logo" />
      <Form />
    </div>
  );
}

export default Right;
