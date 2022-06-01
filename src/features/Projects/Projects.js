import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import { ArrowRight, ArrowDropDown, ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import styles from './Projects.module.css';
import { Container } from "@mui/system";
import OptionsMenu from "./OptionsMenu";

import TreeItemWithMenu from "./TreeItemWithMenu";

function Projects() {
  return (
    <>
      <BasicNavBar />
      <Container className={styles.container} maxWidth={"md"}>
        
        <Paper elevation={3} className={styles.paper}>
          <TreeView defaultCollapseIcon={<ArrowCircleDownOutlined size="large"/>} defaultExpandIcon={<ArrowCircleRightOutlined size="large"/>}>
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
