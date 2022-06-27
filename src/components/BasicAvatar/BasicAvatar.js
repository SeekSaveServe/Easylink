import { Avatar } from "@mui/material";

// provide custom sx to override
function BasicAvatar(props) {
  const { ...rest } = props;

  return (
    <Avatar
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      {...rest}
    ></Avatar>
  );
}

export default BasicAvatar;
