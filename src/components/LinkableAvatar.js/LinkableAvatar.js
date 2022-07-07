import { Avatar } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import { useAlert } from "../Alert/AlertContext";

// provide custom sx to override
function LinkableAvatar(props) {
  // Setting the navigation link
  let navigate = useNavigate();
  const showAlert = useAlert();

  // info prop: pass the info to the url being redirected to (usually Profile) 
  const { page_url, src, info,...rest } = props;
  const link = page_url ? page_url : "/Profile";
  const onClick = () => {
    if (info) {
      navigate(link, { replace: true, state:info });
    } else {
      navigate(link, { replace: true });
    }    
  };
  // Obtaining the avatar from database
  const [avatarUrl, setAvatarUrl] = useState(null);
  const downloadImage = async (path) => {
    if (!path) {
      setAvatarUrl("");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      // For some accounts an alert keeps showing if the avatarUrl is blank. Tempfix to keep alert from popping up on every tab change
      // showAlert(
      //   error.error_description || error.message,
      //   "error"
      // );
      console.log(error);
    }
  };

  useEffect(() => {
    downloadImage(src);
  }, [src]);
  return (
    <Avatar
      onClick={onClick}
      src={avatarUrl}
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      {...rest}
    ></Avatar>
  );
}

export default LinkableAvatar;
