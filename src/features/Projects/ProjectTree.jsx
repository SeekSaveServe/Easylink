import { TreeView } from "@mui/lab";
import { ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import TreeItemWithMenu from "./TreeItemWithMenu";
import { useEffect, useState } from "react";
import useBasicAlert from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projectsSlice";
import { CircularProgress, Typography } from "@mui/material";

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
        <TreeItemWithMenu label={data.title} nodeId={`${pid}`} key={pid} />
      );
    }

    // have children: get trees for children first
    const childTrees = [];

    for (const childId of data.childrenIds) {
      childTrees.push(renderTree(childId));
    }

    return (
      <TreeItemWithMenu label={data.title} nodeId={`${pid}`} key={pid}>
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

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects);

    // const { BasicAlert, showAlert } = useBasicAlert("error"); - there is a problem with the hook

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
        <div>
          { display() }
        </div>
    )
}

export default ProjectTree;