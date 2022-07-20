import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { selectProjectById } from "./projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../user/userSlice";
import { clearLinks } from "../Links/linksSlice";
import useAlertDialog from "../../components/AlertDialog/AlertDialog";
// parentId: the pid of the project this menu is associated with
// for use specifically in ProjectTree
function OptionsMenu({ parentId }) {
  const dispatch = useDispatch();
  const project = useSelector((state) => selectProjectById(state, parentId));

  const { openDialog, AlertDialog } = useAlertDialog();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log("FLAG", window.Cypress?.PROJ_ARG)
    if (process.env.NODE_ENV !== 'production' && window.Cypress?.PROJ_ARG) {
      switch(window.Cypress.PROJ_ARG) {
        case "switch":
          console.log("Cypress switch");
          handleSwitchProject();
          break;
        case "add":
          console.log("Cypress add");
          addSubProject();
          break;
        case "delete":
          console.log("Cypress delete");
          openDialog();
          break;
      }

      return;
    }

    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addSubProject = () => {
    // pass data while navigating without props
    navigate('/addproject', { state: { parentId } });
    // handleClose();
  }

  const handleDelete = async() => {
    console.log("Delete proj");
    console.log("pid", parentId);
    const {data, error} = await supabase
      .from('projects')
      .delete()
      .match({ pid: parentId });
    
    if (error) {
      throw error;
    }

    window.location.reload()


    // navigate('/projects', { state: { isProject: true } })
  }

  const handleSwitchProject = async() => {
    dispatch(replace({...project, isProject:true}));
    sessionStorage.setItem('currProject', JSON.stringify({ pid: parentId }))
    // dispatch(clearLinks());
    handleClose();
  }

  return (
    <div>
      <AlertDialog 
        title={`Delete project "${project.username}"?`}
        description={`This will delete the project "${project.username}" and all associated sub-projects.`}
        disagreeText={"Cancel"}
        agreeText={"Delete project"}
        agreeAction={handleDelete}
      />
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        data-testid={parentId}
      >
        <MenuIcon fontSize="small"/>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem onClick={handleSwitchProject}>Switch to project</MenuItem>
        <MenuItem onClick={addSubProject}>Add sub-project</MenuItem>
        <MenuItem onClick={openDialog}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsMenu;