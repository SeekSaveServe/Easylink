import { TreeItem, useTreeItem } from "@mui/lab"
import OptionsMenu from "./OptionsMenu"
import { Box, Typography } from "@mui/material"
import { forwardRef } from "react";
import clsx from 'clsx';

const CustomContent = forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;
  
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);
  
    const icon = iconProp || expansionIcon || displayIcon;
  
    const handleMouseDown = (event) => {
      preventSelection(event);
    };
  
    const handleExpansionClick = (event) => {
      handleExpansion(event);
    };
  
    const handleSelectionClick = (event) => {
      handleSelection(event);
    };
  
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

function TreeItemWithMenu({label, nodeId, children,...rest}) {
    return (
      <TreeItem
        ContentComponent={CustomContent}
        label={
          <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr:0}}>
          <Typography variant="subtitle1">{label}</Typography>
          <Box component={() => <OptionsMenu projectId={nodeId}/>} />
      
          </Box>
        }
        nodeId={nodeId}
        {...rest}
      >
        { children }
      </TreeItem>
    )
}

export default TreeItemWithMenu;