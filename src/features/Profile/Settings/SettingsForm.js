import BasicTextField from "../../../components/Basic Textfield";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import BasicButton from "../../../components/BasicButton";
import styles from "../../components/left/Left.module.css";
import { Link, useNavigate } from "react-router-dom";
import { PersonOutline, Email, LockOutlined } from "@mui/icons-material";
import TitleIcon from "@mui/icons-material/Title";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../user/userSlice";
import useBasicAlert from "../../../components/Alert";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function SettingsForm() {
  // States for registration
  const dispatch = useDispatch();
  const { BasicAlert, showAlert } = useBasicAlert("error");

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.username) setUserName(user.username);
    if (user?.title) setTitle(user.title);
    if (user?.bio) setBio(user.bio);
  }, [user]);

  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  // state for loading
  const [loading, setLoading] = useState(false);

  // Handling name change
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  // Handle Password change
  async function onPasswordChange(e) {
    showAlert("Sending email...", "warning");
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      supabase.auth.user().email
    );
    showAlert("Password change email sent!", "success");
  }

  // Validate form fields + appropriate alerts
  // Return true if form valid else false
  const validForm = async () => {
    const haveBlank = [userName].some((str) => str.trim() == "");

    if (haveBlank) {
      showAlert("Please fill in username");
      return false;
    }

    // DB check only after everything else has passed
    const { data, error } = await supabase
      .from("users")
      .select("username,email")
      .or(`username.eq.${userName}`);

    if (error) {
      showAlert(error.error_description || error.message, "error");
      return false;
    } else {
      if (data.length == 0 || userName == user.username) return true;

      showAlert("Username already exists!", "error");
      return false;
    }
  };

  // Handling the form submission
  async function updateSupabase() {
    const { data, error } = await supabase
      .from("users")
      .update({ username: userName, title: title, bio: bio })
      .match({ id: supabase.auth.user().id });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formValid = await validForm();

    if (formValid) {
      // signing up
      try {
        setLoading(true);
        dispatch(update({ username: userName, title: title, bio: bio }));
        updateSupabase();
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className={styles.Left}>
      <BasicAlert />
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
          label="Title"
          onChange={handleTitleChange}
          className="input"
          value={title}
          type="text"
          margin="normal"
          icon={<TitleIcon />}
        />

        <BasicTextField
          label="Bio"
          onChange={handleBioChange}
          className="input"
          value={bio}
          type="text"
          margin="normal"
          icon={<AutoAwesomeIcon />}
          multiline
        />

        <BasicButton bg="secondary" onClick={handleSubmit}>
          Update Account
        </BasicButton>
        <BasicButton bg="red" onClick={onPasswordChange}>
          Change Password
        </BasicButton>
      </form>
    </div>
  );
}
