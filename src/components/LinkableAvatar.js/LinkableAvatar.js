import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

// provide custom sx to override
function LinkableAvatar(props) {
  let navigate = useNavigate();
  const { url, ...rest } = props;
  const link = url ? url : "/Profile";
  const onClick = () => {
    navigate(link, { replace: true });
  };

  return <Avatar onClick={onClick} {...rest}></Avatar>;
}

export default LinkableAvatar;
