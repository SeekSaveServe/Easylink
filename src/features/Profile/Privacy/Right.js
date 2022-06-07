import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { React } from "react";
import BasicTextfield from "../../../components/Basic Textfield";
import Checkmarks from "../../../components/Checkmarks";
import styles from "../Settings.module.css";
import { supabase } from "../../../supabaseClient";
import { Telegram } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../user/userSlice";
import UploadAvatar from "../../components/UploadAvatar";
import BasicButton from "../../../components/BasicButton";
import useBasicAlert from "../../../components/Alert";

export default function Right({ contact }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [telegram, setTelegram] = useState("");

  // State of selected tags
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  // display skills
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [communities, setCommunities] = useState([]);

  // Alert
  const { BasicAlert, showAlert } = useBasicAlert("error");

  // Get Tags from db
  async function obtainTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .is("in_login", true);
    return data;
  }

  // Get user tags from db
  async function obtainUserTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .eq("uid", supabase.auth.user().id);
    return data;
  }

  // Get user telegram
  async function obtainTelegram() {
    const { data, error } = await supabase
      .from("users")
      .select("telegram")
      .eq("id", supabase.auth.user().id);
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

    obtainUserTags("user_skills").then((res) =>
      res
        ? setSelectedSkills([res.map((obj) => obj.name)][0])
        : setSelectedSkills([])
    );

    obtainUserTags("user_interests").then((res) =>
      res
        ? setSelectedInterests([res.map((obj) => obj.name)][0])
        : console.log(res)
    );

    obtainUserTags("user_communities").then((res) =>
      res
        ? setSelectedCommunities([res.map((obj) => obj.name)][0])
        : setSelectedCommunities([])
    );

    setTelegram(user.telegram);
  }, []);

  // Updates telegram display
  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  async function updateSupabase() {
    console.log(user.id);
    async function updateUsers() {
      try {
        const { data, error } = await supabase
          .from("users")
          .update({
            telegram: telegram,
            telegram_visibility: contact.telegram_visibility,
            email_visibility: contact.email_visibility,
          })
          .match({ id: supabase.auth.user().id });
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      } finally {
        return;
      }
    }

    async function updatePreferences() {
      try {
        const { data, error } = await supabase
          .from("user_communities")
          .delete()
          .match({ uid: supabase.auth.user().id });
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      }
      try {
        for (let i = 0; i < selectedCommunities.length; i++) {
          const { error } = await supabase.from("user_communities").insert([
            {
              uid: supabase.auth.user().id,
              name: selectedCommunities[i],
            },
          ]);
          // console.log(error);
        }
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      }
      try {
        const { data, error } = await supabase
          .from("user_skills")
          .delete()
          .match({ uid: supabase.auth.user().id });
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      }
      try {
        for (let i = 0; i < selectedCommunities.length; i++) {
          const { error } = await supabase.from("user_skills").insert([
            {
              uid: supabase.auth.user().id,
              name: selectedSkills[i],
            },
          ]);
          // console.log(error);
        }
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      }
      try {
        const { data, error } = await supabase
          .from("user_interests")
          .delete()
          .match({ uid: supabase.auth.user().id });
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      }
      try {
        for (let i = 0; i < selectedCommunities.length; i++) {
          const { error } = await supabase.from("user_interests").insert([
            {
              uid: supabase.auth.user().id,
              name: selectedInterests[i],
            },
          ]);
          // console.log(error);
        }
      } catch (error) {
        showAlert(error.error_description || error.message, "error");
      } finally {
        showAlert("Success!", "success");
      }
    }
    updateUsers();
    updatePreferences();
  }

  const updateFormState = () => {
    dispatch(
      update({
        tags: [selectedSkills, selectedInterests, selectedCommunities],
        telegram,
        telegram_visibility: contact.telegram_visibility,
        email_visibility: contact.email_visibility,
      })
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    updateFormState();
    updateSupabase();
  }

  return (
    <div className={styles.child1}>
      <BasicAlert />
      <form>
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
        <BasicButton bg="red" onClick={handleSubmit}>
          Update
        </BasicButton>
      </form>
    </div>
  );
}
