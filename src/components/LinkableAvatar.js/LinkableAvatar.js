import { Avatar } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import useBasicAlert from "../Alert";
import { useEffect } from "react";

// provide custom sx to override
function LinkableAvatar(props) {
  // Setting the navigation link
  let navigate = useNavigate();
  const { page_url, src, ...rest } = props;
  const link = page_url ? page_url : "/Profile";
  const onClick = () => {
    navigate(link, { replace: true });
  };
  // Obtaining the avatar from database
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { BasicAlert, showAlert } = useBasicAlert("error");
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
      showAlert(
        error.error_description || error.message,
        "Error downloading image"
      );
    }
  };

  useEffect(() => {
    downloadImage(src);
  }, [src])
  return <Avatar onClick={onClick} src={avatarUrl} {...rest}></Avatar>;
}

export default LinkableAvatar;
