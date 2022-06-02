import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function OptionsMenu({ parentId }) {
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
        <MenuItem onClick={handleClose}>Switch to project</MenuItem>
        <MenuItem onClick={addSubProject}>Add sub-project</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsMenu;