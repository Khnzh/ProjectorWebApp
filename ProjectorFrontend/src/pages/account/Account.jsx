import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import Sidebar from "../../components/sidebar/Sidebar";

import styles from "./Account.module.scss";
import ProjectCreate from "../projectCreate/ProjectCreate";
import ProjectDisplay from "../projectDisplay/ProjectDisplay";
import ProjectorSbButton from "../../components/projectorSbButton/ProjectorSbButton";
import Header from "../../components/header/Header";
import { unauthorizedRedirect } from "../../utilityFunctions/unauthorizedRedirect";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../config/supabaseClient";

export default function Account(props) {
  const location = useLocation();
  const [sbDisplay, setSbDisplay] = useState(false);
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const [uId, setUId] = useState(null);
  const [pId, setPId] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const sb = useRef(null);
  const mainDiv = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const fetchProfileInfo = async (userId) => {
    let { data: profile, error } = await supabase
      .from("Profile")
      .select("id, name, lastName")
      // Filters
      .eq("user_id", userId);

    if (error) {
      console.log(error);
    } else {
      setPId(profile[0].id);
      localStorage.setItem("profile", profile[0].id);
      setName(profile[0].name);
      localStorage.setItem("name", profile[0].name);
      setLastName(profile[0].lastName);
      localStorage.setItem("lastName", profile[0].lastName);
    }
  };

  useEffect(() => {
    let info = localStorage.getItem(localKey);
    if (info) {
      info = JSON.parse(info);
    } else {
      return undefined;
    }
    setUId((u) => info.user.id);
    setEmail((e) => info.user.email);

    fetchProfileInfo(info.user.id);
  }, []);

  useEffect(() => {
    if (
      !(
        location.pathname === "/projects" ||
        (location.pathname.startsWith("/project/") &&
          location.pathname !== "/project/create")
      )
    )
      unauthorizedRedirect(isLoggedIn, setIsLoggedIn, navigate);
  }, [isLoggedIn, setIsLoggedIn, navigate]);

  useEffect(() => {
    if (sb.current && mainDiv.current)
      if (sbDisplay) {
        sb.current.style.transform = "translateX(0)";
        sb.current.style.borderRight = "2px solid white";
        // sb.current.style.display = "block";
        mainDiv.current.style.width = "75%";
        mainDiv.current.style.marginLeft = "25%";
      } else {
        sb.current.style.transform = "translateX(-100%)";
        sb.current.style.borderRight = "2px solid black";
        // sb.current.style.display = "none";
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
        <Sidebar
          uId={uId}
          pId={pId}
          name={name}
          lastName={lastName}
          email={email}
          sb={sb}
          toggle={toggleSb}
        />
        <div className={styles.flex_column_container}>
          <div className={styles.alt_navbar}>
            <div className={styles.toggle_btn_cnt}>
              {isLoggedIn && (
                <ProjectorSbButton visible={!sbDisplay} toggle={toggleSb} />
              )}
            </div>
            <Header />
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
