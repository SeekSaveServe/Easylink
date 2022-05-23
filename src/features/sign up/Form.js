import { StylesProvider } from "@chakra-ui/react";
import { style } from "@mui/system";
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
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          onChange={handleNameChange}
          className="input"
          value={userName}
          type="text"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={handleEmailChange}
          className="input"
          value={email}
          type="email"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handlePasswordChange}
          value={password}
          type="password"
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={handleConfirmPasswordChage}
          className="input"
          value={confirmPassword}
          type="password"
        />

        <BasicButton bg="secondary">
          Create Account
        </BasicButton>
      </form>
    </div>
  );
}
