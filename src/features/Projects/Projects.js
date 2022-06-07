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
  const [isProject, setIsProject] = useState(state?.isProject ?? true);
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <Center>
          <NavButtonGroup isProject={isProject} setIsProject={setIsProject}/>
        </Center>
        { isProject ? <ProjectTree/> : <Posts/> }
      </Container>
    </>
  );
}

export default Projects;
