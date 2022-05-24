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
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const userName = useSelector((state) => state.userName);
  const telegram = useSelector((state) => state.telegram);
  const tags = useSelector((state) => state.tags);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("PASSWORD:");
    console.log(password);
    // signing up
    try {
      setLoading(true);
      // 1. Creates account
      const { user, error } = supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
    // 2. Update user information
    try {
      console.log("USER:");
      console.log(supabase.auth.user());
      const { error } = supabase.from("users").insert([
        {
          id: supabase.auth.uid(),
          username: userName,
          avatar_url: "www.google.com",
          email: email,
          telegram: telegram,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
    // 3. Update interest, skills, and communities table
    const arr = ["user_intrests", "user_skills", "user_communities"];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < tags[i].length; j++) {
        try {
          const [error] = supabase.from(arr[i]).insert([
            {
              uid: supabase.auth.uid(),
              name: tags[i][j],
            },
          ]);
        } catch {
        } finally {
          alert("success!");
          setLoading(false);
        }
      }
    }
    // console.log(user);
    alert("Success!");
    navigate("/feed", { replace: true });
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

          <BasicButton
            bg="primary"
            sx={{ width: "50%", mt: 2 }}
            onClick={handleSubmit}
          >
            Start Linking!
          </BasicButton>
        </Paper>
      </Container>
    </div>
  );
}

export default PrivacySettings;
