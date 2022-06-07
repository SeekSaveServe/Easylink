import Left from "./Left";
import Right from "./Right";
import styles from "../Settings.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Down() {
  const user = useSelector((state) => state.user);
  const [avatarUrl, set_AvatarUrl] = useState(user.avatar_url);

  return (
    <div className={styles.parent}>
      <Left user={user} avatarUrl={avatarUrl} set_AvatarUrl={set_AvatarUrl} />
      <Right user={user} avatarUrl={avatarUrl} />
    </div>
  );
}
