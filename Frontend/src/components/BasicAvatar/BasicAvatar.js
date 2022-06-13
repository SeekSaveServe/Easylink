import { Avatar } from "@mui/material";

// provide custom sx to override
function BasicAvatar(props) {
  const { ...rest } = props;

  return <Avatar {...rest}></Avatar>;
}

export default BasicAvatar;
