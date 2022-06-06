import Left from "./Left";
import Right from "./Right";
import styles from "../Settings.module.css";

export default function Down() {
  return (
    <div className={styles.parent}>
      <Left />
      <Right />
    </div>
  );
}
