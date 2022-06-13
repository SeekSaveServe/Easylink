import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import {  Button, ButtonGroup, Paper  } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { Container } from "@mui/system";
import ProjectTree from "./ProjectTree";
import { AddCircleOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, Center } from "@chakra-ui/react";
import NavButtonGroup from "./NavButtonGroup";
import { useEffect, useState } from "react";
import Posts from './Posts';
import { Typography } from "@mui/material";
import { getUser, getUserProfile } from "../user/userSlice";
import { useAlert } from "../../components/Alert/AlertContext";

function Projects() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const showAlert = useAlert();
  // for projects/posts button navigation
  const [isProject, setIsProject] = useState(state?.isProject ?? true);

  const user = useSelector(state => state.user); // check for selected project
  const projects = useSelector(state => state.projects);

  const switchUser = async() => {
    await dispatch(getUserProfile(supabase.auth.user().id));
    sessionStorage.removeItem("currProject");
    showAlert("Switched to user!", "success");
  };

  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
      
      {user?.isProject ?
        <Center>
          <NavButtonGroup isProject={isProject} setIsProject={setIsProject}/>
        </Center> : <></> }

          { isProject && user?.isProject ? 
            <Center style={{display: "flex", marginTop:10, marginBottom:10}}>
            <BasicButton bg="secondary" sx={{width: "20%", padding: "0.01rem", mr:2}} 
              onClick={switchUser}>Switch to user</BasicButton>
              <Typography variant="h6" sx={{fontWeight:'normal'}}>Selected project: <b>{user.username}</b> </Typography>
            </Center> : <></> }

        { isProject ? <ProjectTree/> : <Posts/> }
      </Container>
    </>
  );
}

export default Projects;
