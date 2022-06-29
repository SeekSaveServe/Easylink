import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Upperhalf from "./Upperhalf";
import Lowerhalf from "./Lowerhalf";
import {Container} from "@mui/material";

function Profile() {
  return (
    <>
      <BasicNavBar />
      <Container sx={{maxWidth: 'xl', backgroundColor: "#EEECEC", mt:0.5, height: "100vh"}}>
        <Upperhalf />{" "}
        <Lowerhalf />{" "}
      </Container>
    </>
  );
}

export default Profile;
