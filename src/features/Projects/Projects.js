import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import {  Button, ButtonGroup, Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";
import ProjectTree from "./ProjectTree";
import { AddCircleOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, Center } from "@chakra-ui/react";
import NavButtonGroup from "./NavButtonGroup";
import { useState } from "react";
import Posts from './Posts';
import { Typography } from "@mui/material";

function Projects() {
  async function addProj() {
    // const { data, error } = await supabase
    //   .from('projects')
    //   .insert([
    //     {
    //       parent_id: null,
    //       uid: supabase.auth.user().id,
    //       title: 'First project',
    //       bio: 'First project bio'
    //     }
    //   ])
    
    // if (error) {
    //   console.log(error);
    // } else {
    //   console.log(data);
    // }
  }

  const { state } = useLocation();
  // for projects/posts button and navigation
  const [isProject, setIsProject] = useState(state?.isProject ?? true);
  const user = useSelector(state => state.user); // check for selected project
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <Center>
          <NavButtonGroup isProject={isProject} setIsProject={setIsProject}/>
        </Center>

          { isProject && user?.isProject ? 
            <Center style={{display: "flex", marginTop:5, marginBottom:10}}>
              <Typography variant="h6" sx={{fontWeight:'normal'}}>Selected project: <b>{user.title}</b> </Typography>
              <BasicButton bg="secondary" sx={{width: "20%", padding: "0.02rem", ml:2}}>Switch to user</BasicButton>
            </Center> : <></> }

        { isProject ? <ProjectTree/> : <Posts/> }
      </Container>
    </>
  );
}

export default Projects;
