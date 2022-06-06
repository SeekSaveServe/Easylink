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

function Projects() {
  const navigate = useNavigate();

  function addProject() {
    navigate('/addproject');
  }
  
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

  const isActive = false;
  const props = isActive ? {
    variant: "contained"
  } : {}
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <NavButtonGroup/>
        {/* <ButtonGroup variant="outlined" sx={{mb:1}}>
          <Button {...props}>Projects</Button>
          <Button>Posts</Button>
        </ButtonGroup> */}

        <Paper elevation={3} className={styles.paper}>
          <Button 
            variant="outlined" 
            sx={{textTransform: 'none', width: '20%', pl:1, ml:1}} 
            startIcon={<AddCircleOutlined/>} 
            size="normal"
            onClick={addProject}
            >Add root project</Button>
          <ProjectTree/>
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
