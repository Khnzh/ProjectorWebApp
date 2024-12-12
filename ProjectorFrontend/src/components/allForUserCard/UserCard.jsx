import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserCard.module.scss";
import cn from "classnames";

const UserCard = ({ item, coverImg, index }) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);

  function goToDetailedView(id) {
    navigate(`/user/${id}`);
  }

  function defaultImage(e) {
    e.target.style.padding = "10%";
    e.target.src = "/assets/Woman.svg";
  }

  useEffect(() => {
    const handleScroll = () => {
      const cardPosition = document
        .getElementById(`user-${item.id}`)
        .getBoundingClientRect();
      const cardHeight = cardPosition.height;
      const offset = cardPosition.top;

      const maxOpacity = 1;
      const minOpacity = 0.2;

      const calculatedOpacity = Math.max(
        minOpacity,
        maxOpacity - offset / (window.innerHeight + cardHeight)
      );
      setOpacity(calculatedOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [item.id]);

  return (
    <div
      id={`user-${item.id}`}
      className={styles.user_card}
      key={item.id}
      onClick={() => goToDetailedView(item.id)}
      style={{ opacity }}
    >
      <div className={cn(styles.img_frame, styles.user_img_frame)}>
        <img
          src={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/profile_photos/${item.user_id}/avatar.png`}
          className={styles.defImg}
          alt="hlopushka"
          onError={(e) => defaultImage(e)}
        />
      </div>
      <div className={styles.user_text}>
        <div className={styles.highText}>
          <h1 className={styles.title4}>
            {item.name} {item.lastName}{" "}
          </h1>
          <h1 className={styles.title5}>
            {item.user_qualification.length != 0 &&
              `(${item.user_qualification[0].qualifications.name})`}
          </h1>
        </div>
        <h2 className={styles.medium_title3}>
          {item.Education.length != 0 && item.Education[0].facility}
        </h2>
        <div className={styles.desc_cont}>
          <h3 className={styles.subtitle}>{item.bio}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
