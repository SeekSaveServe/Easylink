import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import VisuallyHidden from "@reach/visually-hidden";
import { useAlert } from "../../../components/Alert/AlertContext";
import BasicAvatar from "../../../components/BasicAvatar/BasicAvatar";
import BasicButton from "../../../components/BasicButton";
import { supabase } from "../../../supabaseClient";
import styles from "./SettingsAvatar.module.css";

export default function SettingsAvatar({ url, size, onUpload }) {
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
      showAlert(error.error_description || error.message, "error");
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
    <div
      className={styles.container}
      style={{ width: size }}
      aria-live="polite"
    >
      {/* <BasicAvatar
        src={avatarUrl}
        alt={avatarUrl ? "Avatar" : "No image"}
        style={{ height: size, width: size }}
      />
      <BasicButton onClick={() => fileInput.current.click()}>
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
      </BasicButton> */}
      {/* <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={uploadAvatar}
        disabled={loading}
        size="small"
        ref={fileInput}
      />
      <label htmlFor="contained-button-file">
        <IconButton>
          <BasicAvatar
            src={avatarUrl}
            alt={avatarUrl ? "Avatar" : "No image"}
            style={{ height: size, width: size }}
          />
        </IconButton>
      </label> */}

      <IconButton component="span" className={styles.image}>
        <BasicAvatar
          src={avatarUrl}
          alt={avatarUrl ? "Avatar" : "No image"}
          style={{
            height: size,
            width: size,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        />
        <input
          accept="image/*"
          className={styles.overlay}
          multiple
          type="file"
          onChange={uploadAvatar}
          disabled={loading}
          ref={fileInput}
        />
      </IconButton>
    </div>
  );
}
