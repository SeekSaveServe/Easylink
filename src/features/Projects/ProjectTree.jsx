import { TreeView } from "@mui/lab";
import { AddCircleOutlined, ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import TreeItemWithMenu from "./TreeItemWithMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projectsSlice";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from './Projects.module.css';
import { useAlert } from "../../components/Alert/AlertContext";

// 1. Get mapping of pid to { ...data, parent_id, childrenIds:[...] }
// 2: At the same time, get root element pids with parent_id = null
// 3. arr = [renderTree(pid) for pid in rootIds], renderTree returns tree of items for that particular pid -> render arr in view

// O(n) space and time: is a tree where each node only one parent -> each node should only be visited once
function returnTree(data) {
  const { idMapping, rootIds } = data;

  const rootArr = [];

  function renderTree(pid) {
    const data = idMapping[pid];
    // if no children
    if (data.childrenIds.length == 0) {
      return (
        <TreeItemWithMenu label={data.username} nodeId={`${pid}`} key={pid} />
      );
    }

    // have children: get trees for children first
    const childTrees = [];

    for (const childId of data.childrenIds) {
      childTrees.push(renderTree(childId));
    }

    return (
      <TreeItemWithMenu label={data.username} nodeId={`${pid}`} key={pid}>
        {childTrees}
      </TreeItemWithMenu>
    )
  }

  // this is not a connected graph (directed graph, more than one root)
  for (const rootId of rootIds) {
    rootArr.push(renderTree(rootId));
  }

  return rootArr;
}

function ProjectTree() {
    useEffect(() => {
      loadData();
    }, []);

    const showAlert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector(state => state.projects);
    
    async function loadData() {
      dispatch(getProjects());
    }

    function display() {
      switch (projects.loading) {
        case 'pending':
          return <div><CircularProgress size={40} sx={{m:3}}/></div>;
        case 'error':
          return <Typography color="error.main">Error</Typography>
        default:
          return projects.ids.length == 0 ? <Typography color="gray" variant="subtitle1" sx={{ml:2, mt:1}}> No projects </Typography> : (
            <TreeView defaultCollapseIcon={<ArrowCircleDownOutlined size="large"/>} defaultExpandIcon={<ArrowCircleRightOutlined size="large"/>}>
              { returnTree({ idMapping: projects.entities, rootIds: projects.rootIds }) }
            </TreeView>
          )
      }
    }

    

    return (
        <Paper elevation={3} className={styles.paper}>
           <Button 
            variant="outlined" 
            sx={{textTransform: 'none', width: '20%', pl:1, ml:1}} 
            startIcon={<AddCircleOutlined/>} 
            size="normal"
            onClick={() => navigate("/addproject") }
            >Add root project</Button>
          { display() }
        </Paper>
    )
}

export default ProjectTree;