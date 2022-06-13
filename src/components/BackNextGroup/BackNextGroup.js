import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import BasicButton from "../BasicButton";

function BackNextGroup({ child1, child2 }) {
    
    return (
        <Stack direction="row" spacing={3}>
          <div style={{ textDecoration: "none", marginLeft: "1.5%", flexGrow: 1 }}>
              {/* <BasicButton bg= onClick={backOnClick}>Back</BasicButton> */}
              {child1}
          </div>

          <div style={{ textDecoration: "none", marginRight: "1.5%", flexGrow: 1 }}>
            {/* <BasicButton bg="secondary" onClick={nextOnClick}>
              Next
            </BasicButton> */}
            {child2}
          </div>
        </Stack>
    )
}

export default BackNextGroup;