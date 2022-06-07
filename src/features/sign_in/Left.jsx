import { useState } from "react";
import { React } from "react";
import BasicButton from "../../components/BasicButton";
import BasicTextField from "../../components/Basic Textfield";
import { supabase } from "../../supabaseClient";
import styles from "./../components/left/Left.module.css";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Email, LockOutlined } from "@mui/icons-material";
import { useAlert } from "../../components/Alert/AlertContext";



function Left({ logo, msg, formState, updateState, handleSignIn }) {
    // const { showAlert, BasicAlert } = useBasicAlert("error");
  const showAlert = useAlert();

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
      showAlert("Signed in!", "success");
    } catch (error) {
      showAlert(error.error_description || error.message, "error");

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
        <BasicTextField
          margin="normal"
          label="Email"
          name="email"
          type="email"
          id="outlined-email-input"
          value={formState.email}
          onChange={updateState}
          icon={<Email/>}
        ></BasicTextField>

        <BasicTextField
          margin="normal"
          label="Password"
          name="password"
          type="password"
          id="outlined-password-input"
          value={formState.password}
          onChange={updateState}
          icon={<LockOutlined/>}
        ></BasicTextField>

        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Remember Me"></FormControlLabel>
        </FormGroup>

        <BasicButton bg="secondary" onClick={handleLogin}>
          Sign in
        </BasicButton>
      </form>
    </div>
  );
}

export default Left;
