import { useState } from "react";
import { Link } from "react-router-dom";

export function HaveAccount() {
  // States for login button
  const [login, setLogin] = useState(false);

  // Handling login button
  const handleLoginButton = (e) => {
    setLogin(true);
  };

  // Show login page
  const showLogin = () => {
    return (
      <div
        className="switchToLogin"
        style={{
          display: login ? "" : "none",
        }}
      >
        <h1> Switched to login page</h1>
      </div>
    );
  };

  return (
    <div className="Leftside">
      <div className="AlreadyHaveAnAccount">
        {" "}
        <h1>Already Have an account?</h1>
      </div>

      <Link to="/" style={{textDecoration:"none"}}>
        <button onClick={handleLoginButton} className="button" type="submit"
        >
          {" "}
          Login{" "}
        </button>
      </Link>
      <div className="messages">{showLogin()}</div>
    </div>
  );
}
