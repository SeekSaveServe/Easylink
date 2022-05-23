import { TextField, Typography } from "@mui/material";

// refer to https://mui.com/material-ui/api/text-field/ and https://mui.com/material-ui/react-text-field/
const bgOptions = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
};

// provide custom sx to override
function BasicTextfield(props) {
  const { variant = "outlined", ...rest } = props;
  // bg is either in {primary, secondary} or a valid color

  return <TextField variant={props.variant} {...rest}></TextField>;
}

export default BasicTextfield;
