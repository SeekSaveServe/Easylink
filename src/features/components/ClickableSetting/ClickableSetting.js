import { Settings } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

export default function ClickableSetting(props) {
  let navigate = useNavigate();
  const onClick = () => {
    navigate("/Settings", { replace: true });
  };

  return <Settings {...props} onClick={onClick} />;
}
