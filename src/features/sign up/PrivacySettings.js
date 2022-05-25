import { Person } from "@mui/icons-material";
import {
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Box,
  Container,
} from "@mui/material";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Easylink Logo Full.png";
import BasicButton from "../../components/BasicButton";
import BasicLoadingButton from "../../components/BasicLoadingButton/BasicLoadingButton";
import { supabase } from "../../supabaseClient";
import { update } from "../user/userSlice";

// rest is props for Checkbox, not FCL
function CheckboxWithLabel({ label, ...rest }) {
  return <FormControlLabel label={label} control={<Checkbox {...rest} />} />;
}

function RadioWithLabel({ value, label, ...rest }) {
  return (
    <FormControlLabel
      label={label}
      value={value}
      control={<Radio {...rest} />}
    />
  );
}
function PrivacySettings() {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    telegram_visibility: "afterlink",
    email_visibility: "afterlink",
  });

  // update field with key = name attribute, to value = value attribute
  const radioChange = (evt) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
  };

  const startLinking = async () => {
    dispatch(update(contact));
  };
  // Handles form submission
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // selectors
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const userName = useSelector((state) => state.user.username);
  const telegram = useSelector((state) => state.user.telegram);
  const tags = useSelector((state) => state.user.tags);

  async function handleSubmit(e) {
    e.preventDefault();
    // signing up
    try {
      setLoading(true);
      // 1. Creates account
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
      setLoading(false);
      return;
    }
    const user = supabase.auth.user();

    // 2. Update user information
    try {
      const { error } = await supabase.from("users").insert([
        {
          id: user.id,
          username: userName,
          avatar_url: "www.google.com",
          email: email,
          telegram: telegram,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
      setLoading(false);
      return;
    }
    // 3. Update interest, skills, and communities table
    const arr = ["user_skills", "user_interests", "user_communities"];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < tags[i].length; j++) {
        try {
          const { error } = await supabase.from(arr[i]).insert([
            {
              uid: user.id,
              name: tags[i][j],
            },
          ]);
          if (error) throw error;
        } catch (error) {
          alert(error.error_description || error.message);
          setLoading(false);
          return;
        }
      }
    }
    // TODO: Unique communities categories
    // TODO: Get the unique communities/skills/etc from db
    // alert("Success!");
    // navigate("/feed", { replace: true });
  }
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "var(--bg-grey)",
        paddingTop: 40,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 0,
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <div style={{ flex: 1 }}>
            <Person fontSize="large" />{" "}
          </div>
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
          {/*  https://stackoverflow.com/questions/38948102/center-one-and-right-left-align-other-flexbox-element*/}
          <div style={{ flex: 1 }}> </div>
        </Box>

        <Paper
          elevation={4}
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "4rem",
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel>
              <Typography variant="h5" color="black">
                Telegram visibility:
              </Typography>
            </FormLabel>

            <RadioGroup
              row
              value={contact.telegram_visibility}
              onChange={radioChange}
              name="telegram_visibility"
            >
              <RadioWithLabel value="afterlink" label="Only after linking" />
              <RadioWithLabel value="everyone" label="Everyone" />
            </RadioGroup>
          </Box>

          <Box
            mt={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel>
              <Typography variant="h5" color="black">
                Email visibility:
              </Typography>
            </FormLabel>

            <RadioGroup
              row
              value={contact.email_visibility}
              onChange={radioChange}
              name="email_visibility"
            >
              <RadioWithLabel value="afterlink" label="Only after linking" />
              <RadioWithLabel value="everyone" label="Everyone" />
            </RadioGroup>
          </Box>

          <BasicLoadingButton
            bg="primary"
            sx={{ width: "50%", mt: 2 }}
            onClick={handleSubmit}
            loading={loading}
          >
            Start Linking!
          </BasicLoadingButton>
        </Paper>
      </Container>
    </div>
  );
}

export default PrivacySettings;
