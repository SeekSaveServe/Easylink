import { Button, ButtonGroup, Center } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Up(isSettings) {
  let navigate = useNavigate();

  const onClick = (e) => {
    navigate("/PrivacySettings", { replace: true });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#93b7db",
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button sx={{ backgroundColor: "white" }}>Settings</Button>
          <Button onClick={onClick}>Privacy</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
