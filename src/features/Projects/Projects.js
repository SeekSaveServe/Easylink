import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import {  Button, Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";

import ProjectTree from "./ProjectTree";
import { AddCircleOutlined } from "@mui/icons-material";

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
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <Paper elevation={3} className={styles.paper}>
          <Button variant="outlined" sx={{textTransform: 'none', float: 'left', width: '20%', pl:0}} startIcon={<AddCircleOutlined/>} size="larges">Add root project</Button>
          <ProjectTree/>
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
