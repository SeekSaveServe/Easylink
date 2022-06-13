import { ButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BasicTextfield from "../../../components/Basic Textfield";
import BasicButton from "../../../components/BasicButton";
import { Form } from "../../sign up/Form";
import SettingsForm from "./SettingsForm";

export default function Right({ user, avatarUrl }) {
  return (
    <Box>
      <SettingsForm user={user} avatarUrl={avatarUrl} />
    </Box>
  );
}
