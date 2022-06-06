import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBasicAlert from "../../../components/Alert";

export default function Left() {
  const dispatch = useDispatch();
  const { BasicAlert, showAlert } = useBasicAlert("error");
  const user = useSelector((state) => state.user);

  const [teleVisibility, setTeleVisibility] = useEffect(false);
  const [emailVisibility, setEmailVisibility] = useEffect(false);
}
