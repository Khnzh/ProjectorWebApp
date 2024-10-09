import React from "react";
import styles from "./ProjectorSbButton.module.scss";

const ProjectorSbButton = ({ visible = true, toggle }) => {
  return (
    <div
      className={visible ? styles.logo_container : styles.hidden}
      onClick={toggle}
    >
      <img
        className={styles.image}
        src={"/assets/24460b1d64f6723e11f3547be97d0e99.svg"}
        alt="alt text"
      />
      <img
        className={styles.second_decorator_image}
        src={"/assets/8600a001ef57bae75a23ca4f8dbe7a1e.svg"}
        alt="alt text"
      />
    </div>
  );
};

export default ProjectorSbButton;
