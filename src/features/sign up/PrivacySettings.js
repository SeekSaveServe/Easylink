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
  Stack
} from "@mui/material";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Easylink Logo Full.png";
import useBasicAlert from "../../components/Alert";
import BasicButton from "../../components/BasicButton";
import BasicLoadingButton from "../../components/BasicLoadingButton/BasicLoadingButton";
import { supabase } from "../../supabaseClient";
import { update } from "../user/userSlice";
import LinkableAvatar from "../../components/LinkableAvatar.js";

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
  const { BasicAlert, showAlert } = useBasicAlert("error");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    telegram_visibility: user?.telegram_visibility ?? "afterlink",
    email_visibility: user?.email_visibility ?? "afterlink",
  });

  // update field with key = name attribute, to value = value attribute
  const radioChange = (evt) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
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
  const avatar_url = useSelector((state) => state.user.avatar_url);

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
      showAlert(error.error_description || error.message, "error");
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
          avatar_url: avatar_url,
          email: email,
          telegram: telegram,
          telegram_visibility:contact.telegram_visibility,
          email_visibility:contact.email_visibility
        },
      ]);

      // Need to find a way to update uuid of storage.objects
      // OR find a way to delete the owner-less entry from stroage.objects
      // const {} = await supabase.storage
      //   .from("avatars")
      //   .update({ owner: user.id })
      //   .eq("name", avatar_url);

      if (error) throw error;
    } catch (error) {
      showAlert(error.error_description || error.message, "error");
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
          showAlert(error.error_description || error.message, "error");
          setLoading(false);
          return;
        }
      }
    }
    // TODO: Add feed
    // TODO: Add Avatar button
    navigate("/", { replace: true });
  }

  const handleBack = () => {
    dispatch(update({
      telegram_visibility:contact.telegram_visibility,
      email_visibility: contact.email_visibility
    }));

    navigate("/Registration_Tags", { replace: true });
  };
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
        <BasicAlert />
        <Box sx={{ display: "flex", width: "100%" }}>
          <div style={{ flex: 1 }}>
            <LinkableAvatar src={user.avatar_url} sx={{height: 75, width: 75}}/>
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
          
          <Stack sx={{mt:5}} direction="row" spacing={3}> 
            <div style={{flexGrow: 1}}>
              <BasicButton bg="secondary" onClick={handleBack} sx={{paddingLeft: "2rem", paddingRight: "2rem"}} >
                Back
              </BasicButton>
            </div>
            
            <div style={{flexGrow: 1}}>
              <BasicLoadingButton
                bg="primary"
                onClick={handleSubmit}
                loading={loading}
                sx={{paddingLeft: "1rem", paddingRight: "1rem"}}
              >
                Start Linking!
              </BasicLoadingButton>
            </div>
          </Stack>

        </Paper>
      </Container>
    </div>
  );
}

export default PrivacySettings;
