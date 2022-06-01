import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBasicAlert from "../../../components/Alert";
import BasicAvatar from "../../../components/BasicAvatar";
import { supabase } from "../../../supabaseClient";

export default function DisplayAvatar() {
  // Obtaining the avatar from database
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { BasicAlert, showAlert } = useBasicAlert("error");
  const src = useSelector((state) => state.user.avatar_url);

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
  }, [src]);

  return <BasicAvatar src={src} />;
}
