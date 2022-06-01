import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import {  Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";

import ProjectTree from "./ProjectTree";

// simulation of actual data from DB: e.g select * where projects.uid = user.id;
const data = [
  {
    pid: 0,
    title: 'USDevs',
    parent_id: null,
  },
  {
    pid: 1,
    title: 'Laundrobot',
    parent_id: 0,
  },
  {
    pid: 2,
    title: 'Cinnabot',
    parent_id: 0,
  },
  {
    pid: 3,
    title: 'USC Website',
    parent_id: 0,
  },
  {
    pid: 4,
    title: 'Booking system',
    parent_id: 3,
  },
  {
    pid: 5,
    title: 'Laundry Hardware',
    parent_id: 1,
  }
]


function Projects() {
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        
        <Paper elevation={3} className={styles.paper}>
          <ProjectTree data={data}/>
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
