import { useState, React } from "react";
import logo from "../../Assets/Easylink Logo Full.png";
import "./signIn.css";
import Left from "./Left";
import Right from "./Right";
import styles from "./../components/left/Left.module.css";

function SignIn() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("Your Account");

  function updateState(evt) {
    setFormState({
      ...formState,
      [evt.target.getAttribute("name")]: evt.target.value,
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
    <div className={styles.page}>
      <Left
        logo={logo}
        msg={msg}
        formState={formState}
        updateState={updateState}
        handleSignIn={handleSignIn}
      />
      <Right />
    </div>
  );
}

export default SignIn;
