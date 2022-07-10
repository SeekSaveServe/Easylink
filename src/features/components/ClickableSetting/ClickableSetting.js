import { Settings } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import TooltipIconButton from "../../../components/TooltipIconButton";

export default function ClickableSetting(props) {
  let navigate = useNavigate();
  const onClick = () => {
    navigate("/Settings", { replace: true });
  };

  return <TooltipIconButton title="Settings" icon={<Settings sx={{ fontSize:35}}/>} onClick={onClick}/>
  // return <Settings {...props} onClick={onClick} />;
}
