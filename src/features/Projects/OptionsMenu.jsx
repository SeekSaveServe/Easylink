import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { selectProjectById } from "./projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../user/userSlice";

// parentId: the pid of the project this menu is associated with
function OptionsMenu({ parentId }) {
  const dispatch = useDispatch();
  const project = useSelector((state) => selectProjectById(state, parentId));

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
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
    handleClose();
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
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
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsMenu;