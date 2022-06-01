import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
import styles from './Projects.module.css';
import { Container } from "@mui/system";
import OptionsMenu from "./OptionsMenu";

function TreeItemWithMenu({label, nodeId, children,...rest}) {
  return (
    <TreeItem
      label={
        <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr:0}}>
        <Typography variant="subtitle1" sx={{}}>{label}</Typography>
        <Box component={() => <OptionsMenu projectId={nodeId}/>} />
    
        </Box>
      }
      nodeId={nodeId}
      {...rest}
    >
      { children }
    </TreeItem>
  )
}

function Projects() {
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        
        <Paper elevation={3} className={styles.paper}>
          <TreeView defaultCollapseIcon={<ArrowDropDown />} defaultExpandIcon={<ArrowRight/>}>
            <TreeItemWithMenu label="USDevs" nodeId="1">
              <TreeItemWithMenu label="Laundrobot" nodeId="2"></TreeItemWithMenu>
              <TreeItemWithMenu label="Cinnabot" nodeId="3"></TreeItemWithMenu>
              <TreeItemWithMenu label="USC Website" nodeId="4">
                <TreeItemWithMenu label="Booking System" nodeId="5"></TreeItemWithMenu>
              </TreeItemWithMenu>
            </TreeItemWithMenu>
          </TreeView>
        </Paper>
      </Container>
    </>
  );
}

export default Projects;
