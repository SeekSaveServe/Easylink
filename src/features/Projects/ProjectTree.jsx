import { TreeView } from "@mui/lab";
import { ArrowCircleDownOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import TreeItemWithMenu from "./TreeItemWithMenu";

function ProjectTree({ data }) {
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