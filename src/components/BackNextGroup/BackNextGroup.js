import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import BasicButton from "../BasicButton";

function BackNextGroup({ backOnClick, nextOnClick }) {
    
    return (
        <Stack direction="row" spacing={3}>
          <div style={{ textDecoration: "none", marginLeft: "1.5%", flexGrow: 1 }}>
              <BasicButton bg="primary" onClick={backOnClick}>Back</BasicButton>
          </div>

          <div style={{ textDecoration: "none", marginRight: "1.5%", flexGrow: 1 }}>
            <BasicButton bg="secondary" onClick={nextOnClick}>
              Next
            </BasicButton>
          </div>
        </Stack>
    )
}

export default BackNextGroup;