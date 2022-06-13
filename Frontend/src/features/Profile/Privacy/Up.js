import { Button, ButtonGroup, Center } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";

export default function Up(isSettings) {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/Settings", { replace: true });
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#93b7db",
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={onClick}>Settings</Button>
          <Button sx={{ backgroundColor: "white" }}>Privacy</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
