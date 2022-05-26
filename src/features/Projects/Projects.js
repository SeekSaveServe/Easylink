import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";

function Projects() {
  return (
    <>
      <BasicNavBar />
      <h1> Work in Progress</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/cbuZfY2S2UQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </>
  );
}

export default Projects;
