import React, { useEffect, useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import Sidebar from "../../components/sidebar/Sidebar";

import styles from "./Account.module.scss";
import ProjectCreate from "../projectCreate/ProjectCreate";
import ProjectDisplay from "../projectDisplay/ProjectDisplay";
import ProjectorSbButton from "../../components/projectorSbButton/ProjectorSbButton";

export default function Account(props) {
  const [sbDisplay, setSbDisplay] = useState(false);

  const sb = useRef(null);
  const mainDiv = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    if (sb.current && mainDiv.current)
      if (sbDisplay) {
        sb.current.style.transform = "translateX(0)";
        sb.current.style.borderRight = "2px solid white";
        mainDiv.current.style.width = "75%";
        mainDiv.current.style.marginLeft = "25%";
      } else {
        sb.current.style.transform = "translateX(-100%)";
        sb.current.style.borderRight = "2px solid black";
        mainDiv.current.style.width = "100%";
        mainDiv.current.style.marginLeft = "0";
      }
  }, [sbDisplay]);

  const toggleSb = () => {
    setSbDisplay((prevSbDisplay) => !prevSbDisplay);
  };

  return (
    <section
      className={cn(
        styles.profile_section,
        props.className,
        "project-creation"
      )}
    >
      <div className={styles.flex_row_container} ref={mainDiv}>
        <Sidebar sb={sb} toggle={toggleSb} />
        <div className={styles.flex_column_container}>
          <div className={styles.toggle_btn_cnt}>
            <ProjectorSbButton visible={!sbDisplay} toggle={toggleSb} />
          </div>
          <section className={styles.account_section}>
            <Outlet />
          </section>
        </div>
      </div>
    </section>
  );
}

Account.propTypes = {
  className: PropTypes.string,
};
