import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import {  Button, ButtonGroup, Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";

import ProjectTree from "./ProjectTree";
import { AddCircleOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import NavButtonGroup from "./NavButtonGroup";
import { useState } from "react";
import Posts from './Posts';

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

  const [isProject, setIsProject] = useState(true);
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <NavButtonGroup isProject={isProject} setIsProject={setIsProject}/>
  
        <Paper elevation={3} className={styles.paper}>
          {isProject ? <ProjectTree/> : <Posts/> }
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
