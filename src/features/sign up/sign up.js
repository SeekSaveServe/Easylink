import React from "react";
import logo from "./../../Assets/Easylink Logo Full.png";
import "./sign up.css";
import Left from "./Left";
import Right from "./Right";
import styles from "./../components/left/Left.module.css";

function SignUp() {
  return (
    <>
      <div className={styles.page}>
        <Left />
        <Right logo={logo} />
      </div>
    </>
  );
}

export default SignUp;
