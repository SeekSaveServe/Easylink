import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";

const bgOptions = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
};

function BasicLoadingButton(props) {
  const { children, sx, bg, ...rest } = props;
  const bgColor = bg in bgOptions ? bgOptions[bg] : bg;
  const styleSx = {
    textTransform: "none",
    fontSize: "1.2rem",
    backgroundColor: bgColor,
    padding: "0.5rem",
    ...sx,
  };

  return (
    <LoadingButton
      variant="contained"
      sx={{
        ...styleSx,
        "&:hover": { filter: "brightness(90%)", backgroundColor: bgColor },
      }}
      {...rest}
    >
      {" "}
      <Typography variant="h6">{children}</Typography>
    </LoadingButton>
  );
}

export default BasicLoadingButton;
