import { React } from "react";
import { Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import styles from "./../components/right/Right.module.css";

function Right() {
  return (
    <div className={styles.right}>
      <h1 className={styles.message}>Join us now!</h1>
      <h1 className={styles.secondMessage}> Discover new opportunities!</h1>

      <Link to="/signup" style={{textDecoration:"none"}}>
        <BasicButton bg="secondary">
          Sign up
        </BasicButton>
      </Link>
    </div>
  );
}

export default Right;
