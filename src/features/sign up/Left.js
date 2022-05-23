import { React } from "react";
import { Link } from "react-router-dom";
import { styles } from "./../components/right";

function Left() {
  return (
    <div className={styles.right}>
      <h1 className={styles.message}> Already Have an Account?</h1>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="button" type="button">
          {" "}
          Login{" "}
        </button>
      </Link>
    </div>
  );
}

export default Left;
