import BasicTextField from "../../components/Basic Textfield";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import BasicButton from "../../components/BasicButton";
import styles from "./../components/left/Left.module.css";
import { Link, useNavigate } from "react-router-dom";
import { PersonOutline, Email, LockOutlined } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { update } from "../user/userSlice";

export function Form() {
  // States for registration
  const dispatch = useDispatch();

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
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      !(confirmPassword === password) // TODO: Make unique alert for this
    ) {
      alert("Please fill in all fields!");
    } else {
      // signing up
      try {
        setLoading(true);
        // const { error } = await supabase.auth.signUp({
        //   email: email,
        //   password: password,
        // });

        // if (error) throw error;
        // // console.log(user);
        // alert("Success!");
        navigate("/Registration_Tags", { replace: true });
        dispatch(update({ username: userName, email, password }));
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className={styles.Left}>
      <form>
        <BasicTextField
          label="Username"
          onChange={handleNameChange}
          className="input"
          value={userName}
          type="text"
          margin="normal"
          icon={<PersonOutline />}
        />

        <BasicTextField
          label="Email"
          onChange={handleEmailChange}
          value={email}
          type="email"
          margin="normal"
          icon={<Email />}
        />

        <BasicTextField
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          type="password"
          margin="normal"
          icon={<LockOutlined />}
        />

        <BasicTextField
          label="Confirm Password"
          onChange={handleConfirmPasswordChage}
          value={confirmPassword}
          type="password"
          margin="normal"
          icon={<LockOutlined />}
        />
        <Link
          to="/Registration_Tags "
          style={{ textDecoration: "none", marginTop: 10 }}
        >
          <BasicButton bg="secondary" onClick={handleSubmit}>
            Create Account
          </BasicButton>
        </Link>
      </form>
    </div>
  );
}
