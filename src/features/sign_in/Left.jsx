import { useState } from "react";
import { React } from "react";
import { supabase } from "../../supabaseClient";
import { styles } from "./../components/left";

function Left({ logo, msg, formState, updateState, handleSignIn }) {
  const [loading, setLoading] = useState(false); // awaiting authentication
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email: formState.email,
        password: formState.password,
      });

      if (error) throw error;
      alert("Successful!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.left}>
      <img src={logo} alt="Logo" className={styles.logo} />

      <h1 className={styles.firstMessage}> Sign into</h1>
      <h4 className={styles.secondMessage}> {msg} </h4>

      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={updateState}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={updateState}
        ></input>

        <div style={{ marginBottom: "1rem" }}>
          <input type="checkbox" id="remember-me" name="remember-me"></input>
          <label htmlFor="remember-me">Remember Me</label>
        </div>

        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Left;
