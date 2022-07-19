import BasicButton from "../../components/BasicButton";
import { formatProfile } from "../../components/constants/formatProfileDatum";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Upperhalf from "./Upperhalf";
import Lowerhalf from "./Lowerhalf";
import {Container} from "@mui/material";
import GreyContainer from "../components/GreyContainer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useIdObject from "../../components/hooks/useIdObject";
import { formatProfileStringsToArray } from "../../components/constants/formatProfileDatum";

function Profile() {
  // if I visit Profile from card (viewing public), then refresh page it stays on that instead of showing own
    // take out this useEffect if you want to do sticky profile
  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const idObj = useIdObject();
  const location = useLocation();
  const optionalProfile =  location?.state; // null or info object from ProfileCard
  const currUser = useSelector(state => state.user);

  // in case you find your own profile card and click: don't want to show link buttons, etc. and show settings
  // private: optional is null OR optional id and your id match

  const isPrivate = () => {
    if (optionalProfile == null) return true;

    const currentUserId = "uid" in idObj ? idObj.uid : idObj.pid;
    const infoUserId = "id" in optionalProfile ? optionalProfile.id : optionalProfile.pid;

    return currentUserId == infoUserId; // private if user from info and curr are same
  }

  const isPublic = !isPrivate();

  // why format: profile from feed has strings
  const user = isPublic ? formatProfile(optionalProfile) : currUser; // to pass down
  return (
    <>
      <BasicNavBar />
      <GreyContainer>
        <Upperhalf isPublic={isPublic} user={user}/>{" "}
        <Lowerhalf user={user} isPublic={isPublic} />{" "}
      </GreyContainer>
    </>
  );
}

export default Profile;
