import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Upperhalf from "./Upperhalf";

function Profile() {
  return (
    <>
      <BasicNavBar />
      <Upperhalf />
    </>
  );
}

export default Profile;
