import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Upperhalf from "./Upperhalf";
import Lowerhalf from "./Lowerhalf";

function Profile() {
  return (
    <>
      <BasicNavBar />
      <Paper>
        <Upperhalf />{" "}
      </Paper>
      <Lowerhalf />{" "}
    </>
  );
}

export default Profile;
