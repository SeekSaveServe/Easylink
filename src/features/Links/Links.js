import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider, Tabs, Tab, Container } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import ProfileCardList from "../components/ProfileCardList";
import scroll from '../components/scroll/Scroll.module.css';
import { useState } from "react";
import { Center } from "@chakra-ui/react";



function Projects() {
  const [value, setValue] = useState(0);
  const change = (e, newValue) => {
    setValue(newValue);
  }

  

  return (
    <>
      <BasicNavBar />
      <Container>
        <Center>
          <Tabs value={value} onChange={change} variant="fullWidth" sx={{width: "80%"}}>
            <Tab label="Pending"></Tab>
            <Tab label="Established"></Tab>
            <Tab label="Rejected"></Tab>
          </Tabs>

        </Center>

        <ProfileCardList/>
      </Container>
   
    </>
  );
}

export default Projects;
