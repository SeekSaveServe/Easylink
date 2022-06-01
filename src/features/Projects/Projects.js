import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
import styles from './Projects.module.css';
import { Container } from "@mui/system";

function Projects() {
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        <Paper elevation={3} className={styles.paper}>
          <TreeView defaultCollapseIcon={<ArrowDropDown />} defaultExpandIcon={<ArrowRight/>} sx={{fontSize:"1000px"}}>
            <TreeItem label="USDevs" nodeId="1" sx={{fontSize: "10rem"}}>
              <TreeItem label="Laundrobot" nodeId="2"></TreeItem>
              <TreeItem label="Cinnabot" nodeId="3"></TreeItem>
              <TreeItem label="USC Website" nodeId="4">
                <TreeItem label="Booking System" nodeId="5"></TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
