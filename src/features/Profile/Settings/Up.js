import { Button, ButtonGroup, Center } from "@mui/material";
import { Box } from "@mui/system";

export default function Up(isSettings) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#93b7db",
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button sx={{ backgroundColor: "white" }}>Settings</Button>
          <Button>Privacy</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
