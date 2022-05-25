import { Box } from "@mui/system";
import { useState } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
import BasicTextfield from "../../components/Basic Textfield";
import BasicAvatar from "../../components/BasicAvatar/BasicAvatar";
import BasicButton from "../../components/BasicButton";
import Checkmarks from "../../components/Checkmarks";

import { supabase } from "../../supabaseClient";
import styles from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import { Telegram } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { update } from "../user/userSlice";

export default function RegistrationTags() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [telegram, setTelegram] = useState("");

  // State of selected tags
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  // Placeholder tags for now
  const skills = ["Art", "History", "Java"]; // this should be retrieving tags from the DB ideally
  const interests = ["Art", "History", "Java"]; // this should be retrieving tags from the DB ideally
  const communities = ["NUS", "SOC", "USP", "Tembusu", "CAPT", "RC4", "RVRC"]; // this should be retrieving tags from the DB ideally
  let navigate = useNavigate();

  // Updates telegram display
  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedCommunities);
    console.log(telegram);
    navigate("/privacy", { replace: true });

    dispatch(update({ tags: [selectedSkills, selectedInterests, selectedCommunities], telegram }))
    //     try {
    //       setLoading(true);
    //       const { error } = await supabase.auth.signIn({
    //         email: formState.email,
    //         password: formState.password,
    //       });

    //       if (error) throw error;
    //       alert("Successful!");
    //     } catch (error) {
    //       alert(error.error_description || error.message);
    //     } finally {
    //       setLoading(false);
    //     }
  }

  return (
    <div className={styles.centre}>
      <form>
        <Box className={styles.avatar}>
          <BasicAvatar
            sx={{ width: 66, height: 66 }}
            // className={styles.avatar}
          ></BasicAvatar>
        </Box>
        <h6 className={styles.firstMessage}> Upload your profile picture</h6>
        <Checkmarks
          newTags={skills}
          label="Skills"
          selectedTags={selectedSkills}
          setSelectedTags={setSelectedSkills}
        />
        <Checkmarks
          newTags={interests}
          label="Interests"
          selectedTags={selectedInterests}
          setSelectedTags={setSelectedInterests}
        />{" "}
        <Checkmarks
          required={true}
          newTags={communities}
          label="Communities"
          selectedTags={selectedCommunities}
          setSelectedTags={setSelectedCommunities}
        />{" "}
        <BasicTextfield
          label="Telegram"
          margin="normal"
          value={telegram}
          onChange={handleTelegramChange}
          sx={{ m: 1 }}
          icon={<Telegram />}
        />
        <Link to="/privacy " style={{ textDecoration: "none" }}>
          <BasicButton bg="secondary" onClick={handleSubmit}>
            Next
          </BasicButton>
        </Link>
      </form>
    </div>
  );
}
