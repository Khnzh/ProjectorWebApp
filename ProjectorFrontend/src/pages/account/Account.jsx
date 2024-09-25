import React, { useEffect, useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import Sidebar from "../../components/sidebar/Sidebar";

import styles from "./Account.module.scss";
import ProjectCreate from "../projectCreate/ProjectCreate";
import ProjectDisplay from "../projectDisplay/ProjectDisplay";

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
        hamburger.current.style.position = "fixed";
      } else {
        sb.current.style.transform = "translateX(-100%)";
        sb.current.style.borderRight = "2px solid black";
        mainDiv.current.style.width = "100%";
        mainDiv.current.style.marginLeft = "0";
        hamburger.current.style.position = "absolute";
      }
  }, [sbDisplay]);

  const toggleSb = (e) => {
    e.stopPropagation(); // Prevent event bubbling
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
      <label className={styles.hamburger} ref={hamburger}>
        <input type="checkbox" onClick={(e) => toggleSb(e)} />
        <svg viewBox="0 0 32 32">
          <path
            className={cn(styles.line, styles.line_top_bottom)}
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className={styles.line} d="M7 16 27 16"></path>
        </svg>
      </label>
      <div className={styles.flex_row_container} ref={mainDiv}>
        <Sidebar sb={sb} />
        <div className={styles.flex_column_container}>
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
