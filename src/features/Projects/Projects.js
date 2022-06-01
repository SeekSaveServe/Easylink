import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import {  Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";

import ProjectTree from "./ProjectTree";

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
          <ProjectTree/>
        </Paper>

        <BasicButton bg="primary" onClick={addProj}>Add proj</BasicButton>
      </Container>
    </>
  );
}

export default Projects;
