import { Center } from "@chakra-ui/react";
import { Box } from "@mui/system";
import ClickableSetting from "../components/ClickableSetting";
import DisplayAvatar from "../components/DisplayAvatar/DisplayAvatar";

export default function Upperhalf() {
  return (
    <Box
      sx={{
        backgroundColor: "#93b7db",
        "&:hover": {
          backgroundColor: "#a6cff7",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <ClickableSetting fontSize="large" />
      <Center>
        <DisplayAvatar fontSize="large" />
      </Center>
    </Box>
  );
}
