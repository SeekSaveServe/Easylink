import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider, Tabs, Tab, Container } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import ProfileCardList from "../components/ProfileCardList";
import scroll from '../components/scroll/Scroll.module.css';
import { useState } from "react";
import { Center } from "@chakra-ui/react";


const data = [
  {
    username: "Cat Lover",
    title: "Cat lover, professional photographer, expert coder",
    bio: "Hi! I love to document the cats of NUS and code!",
    // skills, interests, communities
    tags: [["Python", "Meowing", "Photography"], ["Nature", "Software Development", "Photography"], ["USP", "NUS"]],
    dateRange: "Now to Dec 2022",
    isProject: false,
    email: "catlover@gmail.com",
    telegram:"@CatLover",
    // TODO: just for testing, replace with calculated 
    showEmail: true,
    showTele: true
  },
  {
    username: "USDevs",
    title: "Make laundry chill",
    bio: "Hi! We are Project Laundrobot, a subproject under USDevs working on a hardware based laundry notification system.",
    // skills, interests, communities
    tags: [["Python", "Software Development", "Raspberry Pi"], ["Developers"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: true,
    email: "usdevs@gmail.com",
    telegram: "@USDevs",
    
    showEmail: true,
    showTele: false
  },
  {
    username: "Web_Lover",
    title: "Web Lover, expert coder",
    bio: "Hi! I love to make websites.",
    // skills, interests, communities
    tags: [["Python", "JavaScript"], ["Web development", "UI/UX"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: false,
    email: "weblover@gmail.com",
    telegram: "@WebLover",

    showEmail: false,
    showTele: true
  },
  {
    username: "Livecore",
    title: "Looking for live performers",
    bio: "Looking for performers to play in a show.",
    // skills, interests, communities
    tags: [["Drumming", "Guitar", "Singing"], ["Performers"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: true,
    email: "livecore@gmail.com",
    telegram: "@livecore",

    showEmail: false,
    showTele: false
  }
  
]


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

        <ProfileCardList data={data}/>
      </Container>
   
    </>
  );
}

export default Projects;
