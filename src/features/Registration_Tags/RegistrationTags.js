import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
import BasicTextfield from "../../components/Basic Textfield";
import BasicButton from "../../components/BasicButton";
import Checkmarks from "../../components/Checkmarks";

import { supabase } from "../../supabaseClient";
import styles from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import { Telegram } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { update } from "../user/userSlice";
import UploadAvatar from "../components/UploadAvatar";

export default function RegistrationTags() {
  const dispatch = useDispatch();
  const [telegram, setTelegram] = useState("");
  const [avatar_url, set_AvatarUrl] = useState(null);

  // State of selected tags
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  // display skills
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [communities, setCommunities] = useState([]);

  // Placeholder tags for now
  async function obtainTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .is("in_login", true);
    return data;
  }

  useEffect(() => {
    obtainTags("unique_skills").then((res) =>
      setSkills([res.map((obj) => obj.name)][0])
    );

    obtainTags("unique_interests").then((res) =>
      setInterests([res.map((obj) => obj.name)][0])
    );

    obtainTags("unique_communities").then((res) =>
      setCommunities([res.map((obj) => obj.name)][0])
    );
  }, []);

  let navigate = useNavigate();
  // Updates telegram display
  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/privacy", { replace: true });

    dispatch(
      update({
        tags: [selectedSkills, selectedInterests, selectedCommunities],
        telegram,
        avatar_url,
      })
    );
  }

  return (
    <div className={styles.centre}>
      <form>
        <Box className={styles.avatar}>
          <UploadAvatar
            size={150}
            url={avatar_url}
            onUpload={(url) => {
              set_AvatarUrl(url);
            }}
          ></UploadAvatar>
        </Box>
        {/* <h6 className={styles.firstMessage}> Upload your profile picture</h6> */}
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
