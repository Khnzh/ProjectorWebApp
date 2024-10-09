import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import DropdownSpecs from "../dropdownSpecs/DropdownSpecs";

import styles from "./Sidebar.module.scss";
import ProjectorSbButton from "../projectorSbButton/ProjectorSbButton";

export default function Sidebar({ sb, toggle }) {
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const [uId, setUId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [mainSpec, setMainSpec] = useState(null);
  const [avatarURL, setAvatarURL] = useState("/profilePicPlaceholder.png");

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem(localKey));
    setUId((u) => info.user.id);
    setEmail((e) => info.user.email);
  }, []);

  useEffect(() => {
    const fetchName = async (uId) => {
      let { data: Profile, error } = await supabase
        .from("Profile")
        .select("name, lastName")
        // Filters
        .eq("user_id", uId);

      if (error) {
        console.log(error);
      } else {
        setName((n) => Profile[0].name);
        localStorage.setItem("name", Profile[0].name);
        setLastName((l) => Profile[0].lastName);
        localStorage.setItem("lastName", Profile[0].lastName);
      }
    };

    const fetchSpecs = async () => {
      const { data, error } = await supabase
        .from("user_qualifications")
        .select("qualification_id(*)")
        .eq("user_id", uId);
      if (error) {
        console.log(error);
      } else {
        let specsData = data.map((item) => item.qualification_id);
        setSpecs(specsData);
        setMainSpec(specsData[0]);
        localStorage.setItem("specs", JSON.stringify(specsData));
      }
    };

    const fetchAvatarURL = () => {
      const { data, error } = supabase.storage
        .from("profile_photos")
        .getPublicUrl(`${uId}/avatar.png`);

      if (error) {
        console.error("Error generating public URL:", error.message);
        return null;
      } else {
        setAvatarURL(data.publicUrl);
      }
    };

    if (uId) {
      if (!localStorage.getItem("name") || !localStorage.getItem("lastName")) {
        fetchName(uId);
      } else {
        setName(localStorage.getItem("name"));
        setLastName(localStorage.getItem("lastName"));
      }
      if (!localStorage.getItem("specs")) {
        fetchSpecs();
      } else {
        setSpecs(JSON.parse(localStorage.getItem("specs")));
        setMainSpec(JSON.parse(localStorage.getItem("specs"))[0]);
      }
      if (!localStorage.getItem("avatar")) {
        fetchAvatarURL();
      } else {
        setAvatarURL(localStorage.getItem("avatar"));
      }
    }
  }, [uId]);

  return (
    <div className={cn(styles.root, styles.sidebar)} ref={sb}>
      <div className={styles.flex_col}>
        <ProjectorSbButton toggle={toggle} />
        <img className={styles.avatar} src={avatarURL} alt="alt text" />
        <h1 className={styles.big_title}>
          <span className={styles.no_wrap}>{name + " " + lastName}</span>
        </h1>
        <h2 className={styles.medium_title}>{email}</h2>

        <div className={styles.flex_row_info}>
          {specs && (
            <DropdownSpecs
              specs={specs}
              mainSpec={mainSpec}
              setMainSpec={setMainSpec}
            />
          )}
          <img
            className={styles.role_image}
            src={"/assets/ef1f380df79efdee8d12fa47e080a734.svg"}
            alt="alt text"
          />
        </div>

        <h2 className={styles.medium_title1}>
          <span className={styles.no_wrap}>Редактировать профиль</span>
        </h2>

        <button className={styles.full_length_button}>ДОБАВИТЬ ЗАЯВКУ</button>

        <div className={styles.flex_row}>
          <img
            className={styles.image17}
            src={"/assets/e2eb7164ddaa335cc3d6e67781eeceda.svg"}
            alt="alt text"
          />
          <a className={styles.title1}>КАТАЛОГ</a>
        </div>

        <div className={styles.flex_row1}>
          <div className={styles.flex_row_info}>
            <img
              className={styles.image18}
              src={"/assets/9453e8c218b9d080e60d081dcc90771c.svg"}
              alt="alt text"
            />
            <a className={styles.title1}>МОИ ПРОЕКТЫ</a>
            <img
              className={cn(styles.role_image, styles.small_margin_top)}
              src={"/assets/ef1f380df79efdee8d12fa47e080a734.svg"}
              alt="alt text"
            />
          </div>
        </div>

        <div className={styles.flex_row1}>
          <img
            className={styles.image19}
            src={"/assets/6fad9b44cb0964bb4ba8adad213b29c2.svg"}
            alt="alt text"
          />
          <a className={styles.title1}>СПЕЦИАЛИСТЫ</a>
        </div>

        <div className={styles.flex_row1}>
          <img
            className={styles.image20}
            src={"/assets/34278ddd79993269b66817f2d5d5ed8e.svg"}
            alt="alt text"
          />
          <a className={styles.title1}>УВЕДОМЛЕНИЯ</a>
        </div>
      </div>
    </div>
  );
}
