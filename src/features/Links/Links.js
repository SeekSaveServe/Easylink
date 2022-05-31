import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import ProfileCardList from "../components/ProfileCardList";
import scroll from '../components/scroll/Scroll.module.css';


function Projects() {
  return (
    <>
      <BasicNavBar />
      <div className={scroll.scroll_parent}>
        <ProfileCardList/>
      </div>
      {/* <h1> Work in Progress</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/cbuZfY2S2UQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}
    </>
  );
}

export default Projects;
