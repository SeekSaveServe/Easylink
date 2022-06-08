import { useEffect, useRef, useState } from "react";
// import VisuallyHidden from "@reach/visually-hidden";
import { useAlert } from "../../../components/Alert/AlertContext";
import BasicAvatar from "../../../components/BasicAvatar/BasicAvatar";
import BasicButton from "../../../components/BasicButton";
import { supabase } from "../../../supabaseClient";

export default function UploadAvatar({ url, size, onUpload, ParentProps, AvatarProps, ButtonProps }) {
  const showAlert = useAlert();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
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

  const uploadAvatar = async (event) => {
    try {
      setLoading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      showAlert(error.error_description || error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite" style={{display: "flex", flexDirection: "column", alignItems: "center", ...ParentProps?.style}} {...ParentProps}>
      <BasicAvatar
        src={avatarUrl}
        alt={avatarUrl ? "Avatar" : "No image"}
        style={{ height: size, width: size }}
        {...AvatarProps}
      />
      <BasicButton onClick={() => fileInput.current.click()} {...ButtonProps}>
        <input
          ref={fileInput}
          style={{ display: "none" }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={loading}
          size="small"
        />
        Upload your profile picture!
      </BasicButton>
    </div>
  );
}
