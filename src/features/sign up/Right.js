import { React } from "react";
import { Form } from "./Form";
import { styles } from "./../components/left";

function Right({ logo }) {
  return (
    <div className={styles.left}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <Form />
    </div>
  );
}

export default Right;
