import { useState } from "react";
import { React } from "react";
import BasicButton from "../../components/BasicButton";
import BasicTextField from "../../components/Basic Textfield";
import { supabase } from "../../supabaseClient";
import styles from "./../components/left/Left.module.css";

function Left({ logo, msg, formState, updateState, handleSignIn }) {
  const [loading, setLoading] = useState(false); // awaiting authentication
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
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
        <BasicTextField
          margin="normal"
          label="Password"
          name="email"
          type="email"
          id="outlined-email-input"
          size="small"
          value={formState.email}
          onChange={updateState}
        ></BasicTextField>

        <BasicTextField
          margin="normal"
          label="Password"
          name="password"
          size="small"
          type="password"
          id="outlined-password-input"
          value={formState.password}
          onChange={updateState}
        ></BasicTextField>

        <div style={{ marginBottom: "1rem" }}>
          <input type="checkbox" id="remember-me" name="remember-me"></input>
          <label htmlFor="remember-me">Remember Me</label>
        </div>

        <BasicButton bg="secondary" onClick={handleLogin}>
          Sign in
        </BasicButton>
      </form>
    </div>
  );
}

export default Left;
