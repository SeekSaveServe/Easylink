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
          <Button>Settings</Button>
          <Button sx={{ backgroundColor: "white" }}>Privacy</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
