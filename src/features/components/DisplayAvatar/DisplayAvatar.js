import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "../../../components/Alert/AlertContext";
import BasicAvatar from "../../../components/BasicAvatar";
import { supabase } from "../../../supabaseClient";

export default function DisplayAvatar(props) {
  // Obtaining the avatar from database
  const [avatarUrl, setAvatarUrl] = useState(null);
  const showAlert = useAlert();
  const src = useSelector((state) => props.src != undefined ? props.src : state.user.avatar_url);

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
        "error"
      );
    }
  };

  useEffect(() => {
    downloadImage(src);
  }, [src]);

  return <BasicAvatar {...props} src={avatarUrl} />;
}
