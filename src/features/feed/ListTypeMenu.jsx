// for switching between Reccs and Posts
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { Check } from '@mui/icons-material';

function ListTypeMenu({ showPosts, setShowPosts }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickRecc = () => {
        handleClose();
        setShowPosts(false);
    }

    const clickPosts = () => {
        handleClose();
        setShowPosts(true);
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
            <SettingsIcon/>
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
                <MenuItem onClick={clickRecc}>
                    <ListItemText>Recommendations</ListItemText>
                    { showPosts ? <></> : <ListItemIcon sx={{ml:1}}> <Check size={20}/></ListItemIcon> }
                </MenuItem>

                <MenuItem onClick={clickPosts}>
                    Posts
                    { showPosts ? <ListItemIcon sx={{ml:1}}> <Check size={20}/></ListItemIcon> : <></> }
                </MenuItem>
            </Menu>
        </div>
    )

}

export default ListTypeMenu;