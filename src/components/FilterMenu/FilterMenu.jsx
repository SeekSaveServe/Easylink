import {Menu, MenuItem, ListItemText, ListItemIcon, IconButton, Typography, Tooltip } from '@mui/material';
import { FilterList, Check, Filter } from '@mui/icons-material';
import { useState } from 'react';
import TooltipIconButton from '../TooltipIconButton';
// Generic filter icon menu to use with string value options
// assumption: index is number and goes 0,1,2... now we can use index on the outside to filter whatever is needed
// items: [String] e.g ["Users only", "Projects only"]. 

function FilterMenu({ title, icon, items, index, setIndex }) { 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function showMenuItems() {
        return items.map((text, idx) => {
            const onClick = () => {
                handleClose();
                setIndex(idx);
            }

            return (
                <MenuItem key={idx} onClick={onClick}>
                    {/* <ListItemText>{ text }</ListItemText> */}
                    { text }
                    { idx == index ? <ListItemIcon sx={{ml:1}}> <Check size={20}/></ListItemIcon> : <></>}
                </MenuItem>
            )
        });
    }

    return (
        <div>
            <TooltipIconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                icon={icon}
                title={title}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >   

            { showMenuItems() }
                {/* <MenuItem >
                    <ListItemText>Recommendations</ListItemText>
                    { showPosts ? <></> : <ListItemIcon sx={{ml:1}}> <Check size={20}/></ListItemIcon> }
                </MenuItem>

                <MenuItem onClick={clickPosts}>
                    Posts
                    { showPosts ? <ListItemIcon sx={{ml:1}}> <Check size={20}/></ListItemIcon> : <></> }
                </MenuItem> */}
            </Menu>
        </div>
    )
}

export default FilterMenu;


