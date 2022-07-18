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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useAlert } from "../../../components/Alert/AlertContext";
import useAlertDialog from "../../../components/AlertDialog/AlertDialog";
import { signOutFunction } from "../../user/userSlice";

export default function SettingsForm({ user, avatarUrl }) {
  // Checking if we are pushing to the user db or projects db
  const isUser = user.pid ? false : true;

  // States for registration
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openDialog, AlertDialog } = useAlertDialog();
  const signOut = signOutFunction(dispatch);

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
    const { data, error } = isUser
      ? await supabase
          .from("users")
          .select("username,email")
          .or(`username.eq.${userName}`)
      : await supabase
          .from("projects")
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
    const { data, error } = isUser
      ? await supabase
          .from("users")
          .update({
            username: userName,
            title: title,
            bio: bio,
            avatar_url: avatarUrl,
          })
          .match({ id: supabase.auth.user().id })
      : await supabase
          .from("projects")
          .update({
            username: userName,
            title: title,
            bio: bio,
            avatar_url: avatarUrl,
          })
          .match({ pid: user.pid });

    showAlert("Success!", "success");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formValid = await validForm();

    if (formValid) {
      // signing up
      try {
        setLoading(true);
        dispatch(
          update({
            username: userName,
            title: title,
            bio: bio,
            avatar_url: avatarUrl,
          })
        );
        updateSupabase();
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleDelete() {
    if (!user?.id || user.id === "") return;
    console.log("Del user", user.id);

    try {
    const { data, error } = await supabase
      .rpc('delete_user', { user_id: user.id });

    if (error) throw error;
    signOut();

    //navigate('/', { replace: true });
    } catch (error) {
      console.log("Err deleting user", error);
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
        <BasicButton bg="var(--primary)" onClick={onPasswordChange}>
          Change Password
        </BasicButton>  

        { "pid" in user || user.loading == 'idle' ? <></> : 
            <>
            <AlertDialog 
            title={`Delete user: "${user.username}"?`}
            description={`WARNING: This will delete the user "${user.username}" and all associated data, including all owned projects and profile settings.
            You will be re-directed to the log-in page after deletion. This action is irreversible.`}
            disagreeText={"Cancel"}
            agreeText={"Delete User"}
            agreeAction={handleDelete}
            />

          <BasicButton bg="red" sx={{mt:8}} onClick={openDialog}>
            Delete User
          </BasicButton> 
          </> 
        }
        
      </form>
    </div>
  );
}
