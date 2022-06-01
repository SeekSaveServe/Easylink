import { TreeView } from "@mui/lab";
import { ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import TreeItemWithMenu from "./TreeItemWithMenu";
import { useEffect } from "react";

// 1. Get mapping of pid to { ...data, parent_id, childrenIds:[...] }
// 2: At the same time, get root element pids with parent_id = null
// 3. arr = []
  // for each rootId:
    //  arr.push(renderTree(rootId))
// renderTree(pid):
  // if no children: return <TreeItem...> 
  // childrenTrees: []
  // for each childId in children:
    // childrenTrees.push(renderTree(childId));
  // return <TreeItem..> {childrenTrees} </TreeItem>

// data: [Project] where Project at least contains: { pid: uuid/int, title: string, parent_id: FK to pid}
// output: {mapping from pid to data}, [rootIds]
// O(n) space and time where n = data.length
function preprocess(data) {
  const idMapping = {};
  const rootIds = [];

  // add entries for each pid first
  for (const project of data) {
    if (!(project.pid in idMapping)) {
      idMapping[project.pid] = {...project, childrenIds: [] };
    }
  }


  for (const project of data) {
    if (project.parent_id == null) {
      rootIds.push(project.pid);
      continue;
    }

    idMapping[project.parent_id].childrenIds.push(project.pid);
  }

  return { idMapping, rootIds };
}



function ProjectTree({ data }) {
    useEffect(() => {
      const res = preprocess(data);
      console.log(res);
    });
    return (
        <TreeView defaultCollapseIcon={<ArrowCircleDownOutlined size="large"/>} defaultExpandIcon={<ArrowCircleRightOutlined size="large"/>}>
            <TreeItemWithMenu label="USDevs" nodeId="1">
              <TreeItemWithMenu label="Laundrobot" nodeId="2"></TreeItemWithMenu>
              <TreeItemWithMenu label="Cinnabot" nodeId="3"></TreeItemWithMenu>
              <TreeItemWithMenu label="USC Website" nodeId="4">
                <TreeItemWithMenu label="Booking System" nodeId="5"></TreeItemWithMenu>
              </TreeItemWithMenu>
            </TreeItemWithMenu>
          </TreeView>
    )
}

export default ProjectTree;