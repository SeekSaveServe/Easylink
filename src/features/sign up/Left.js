import { React } from "react";
import { Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import styles from "./../components/right/Right.module.css";

function Left() {
  return (
    <div className={styles.right}>
      <h1 className={styles.message}> Already Have an Account?</h1>
      <Link to="/" style={{ textDecoration: "none" }}>
        <BasicButton bg="secondary">
        {" "}
          Login{" "}
        </BasicButton>
      </Link>
    </div>
  );
}

export default Left;
