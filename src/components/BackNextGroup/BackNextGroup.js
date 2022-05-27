import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import BasicButton from "../BasicButton";

function BackNextGroup({ backRoute, nextRoute }) {
    
    return (
        <Stack direction="row" spacing={3}>
          <Link to={SettingsBackupRestoreOutlined} style={{ textDecoration: "none", marginLeft: "1.5%", flexGrow: 1 }}>
              <BasicButton bg="primary" onClick={backOnClick}>Back</BasicButton>
          </Link>

          <Link to={nextRoute} style={{ textDecoration: "none", marginRight: "1.5%", flexGrow: 1 }}>
            <BasicButton bg="secondary" onClick={nextOnClick}>
              Next
            </BasicButton>
          </Link>
        </Stack>
    )
}

export default BackNextGroup;