import BasicTextField from "../../components/Basic Textfield";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import BasicButton from "../../components/BasicButton";
import styles from "./../components/left/Left.module.css";

export function Form() {
  // States for registration
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state for loading
  const [loading, setLoading] = useState(false);

  // Handling name change
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  // Handling email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handling password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handling confirm password change
  const handleConfirmPasswordChage = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      !(confirmPassword === password)
    ) {
      alert("Please fill in all fields!");
    } else {
      // signing up
      try {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) throw error;
        // console.log(user);
        alert("Success!");
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.Left}>
      <form>
        <BasicTextField
          label="Username"
          size="small"
          onChange={handleNameChange}
          className="input"
          value={userName}
          type="text"
          margin="normal"
        />

        <BasicTextField
          label="Email"
          size="small"
          onChange={handleEmailChange}
          value={email}
          type="email"
          margin="normal"
        />

        <BasicTextField
          label="Password"
          size="small"
          onChange={handlePasswordChange}
          value={password}
          type="password"
          margin="normal"
        />

        <BasicTextField
          label="Confrim Password"
          size="small"
          onChange={handleConfirmPasswordChage}
          value={confirmPassword}
          type="password"
          margin="normal"
        />

        <BasicButton bg="secondary" onClick={handleSubmit}>
          Create Account
        </BasicButton>
      </form>
    </div>
  );
}
