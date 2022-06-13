import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Left from "./Left";
import Right from "./Right";
import styles from "../Settings.module.css";

export default function Down() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [contact, setContact] = useState({
    telegram_visibility: user?.telegram_visibility ?? "afterlink",
    email_visibility: user?.email_visibility ?? "afterlink",
  });
  return (
    <div className={styles.parent}>
      <Left contact={contact} setContact={setContact} />
      <Right contact={contact} />
    </div>
  );
}
