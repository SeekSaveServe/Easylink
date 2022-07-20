import BasicButton from "../../components/BasicButton";
import { formatProfile } from "../../components/constants/formatProfileDatum";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider, CircularProgress } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Upperhalf from "./Upperhalf";
import Lowerhalf from "./Lowerhalf";
import {Container} from "@mui/material";
import GreyContainer from "../components/GreyContainer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useIdObject from "../../components/hooks/useIdObject";
import { formatProfileStringsToArray } from "../../components/constants/formatProfileDatum";
import { userLoaded } from "../user/userSlice";
import { Center } from "@chakra-ui/react";

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
  const userHasLoaded = useSelector(userLoaded);
  console.log("user has loaded", userHasLoaded);

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
        { window.Cypress && process.env.NODE_ENV !== 'production' ? <Typography data-testid="user-type">{'pid' in user ? 'PROJECT' : 'USER'}</Typography> : <></> }
        { userHasLoaded ? 
        <>
          <Upperhalf isPublic={isPublic} user={user}/>{" "}
          <Lowerhalf user={user} isPublic={isPublic} />{" "}
        </> : <Center><CircularProgress size={40}/></Center>}
        
      </GreyContainer>
    </> 
  );
}

export default Profile;
