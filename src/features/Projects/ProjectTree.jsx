import { TreeItem, TreeView } from "@mui/lab";
import { ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import TreeItemWithMenu from "./TreeItemWithMenu";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useBasicAlert from "../../components/Alert";

// 1. Get mapping of pid to { ...data, parent_id, childrenIds:[...] }
// 2: At the same time, get root element pids with parent_id = null
// 3. arr = [renderTree(pid) for pid in rootIds], renderTree returns tree of items for that particular pid -> render arr in view


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

// O(n) space and time: is a tree where each node only one parent -> each node should only be visited once
function returnTree(data) {
  const { idMapping, rootIds } = preprocess(data);
  const rootArr = [];

  function renderTree(pid) {
    const data = idMapping[pid];
    // if no children
    if (data.childrenIds.length == 0) {
      return (
        <TreeItemWithMenu label={data.title} nodeId={pid} key={pid} />
      );
    }

    // have children: get trees for children first
    const childTrees = [];

    for (const childId of data.childrenIds) {
      childTrees.push(renderTree(childId));
    }

    return (
      <TreeItemWithMenu label={data.title} nodeId={pid} key={pid}>
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

async function getData() {
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
    },
    {
      pid:6,
      title: 'USTech',
      parent_id: null
    }
  ];

  return {
    data,
    error: null
  }
};

// move this inside loadData after testing complete
async function getActualData() {
  const { data, error } = await supabase.from('projects')
    .select('*');
  return { data, error };
}



function ProjectTree() {
    const [tree, setTree] = useState([]);
    const { BasicAlert, showAlert } = useBasicAlert("error");

    async function loadData() {
      const { data, error } = await getActualData();
      if (error) {
        showAlert(error.message || error.description);
        return;
      } 
    
      setTree(returnTree(data));
      return;
    }

    useEffect(() => {
      loadData();
    }, []);

    return (
        <>
          <BasicAlert/>
          <TreeView defaultCollapseIcon={<ArrowCircleDownOutlined size="large"/>} defaultExpandIcon={<ArrowCircleRightOutlined size="large"/>}>
            {tree}
          </TreeView>
        </>
    )
}

export default ProjectTree;