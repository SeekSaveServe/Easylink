import { React } from "react";
import { Link } from "react-router-dom";

function Left() {
  return (
    <div className="right">
      <h1 className="AleadyHaveAnAccount"> Already Have an Account?</h1>
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
