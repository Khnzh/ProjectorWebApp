import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectCard.module.scss";
import cn from "classnames";

const ProjectCard = ({ item, coverImg, index, isLoading }) => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);

  const coverProjectImage = (imgURL) => {
    return {
      backgroundImage: `url('${imgURL}')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  };

  function goToDetailedView(id) {
    navigate(`/project/${id}`);
  }

  function defaultImage(e) {
    e.target.style = { display: "block" };
    e.target.src = "/assets/hlopushka.svg";
  }

  useEffect(() => {
    const handleScroll = () => {
      const cardPosition = document.getElementById(`project-${item.id}`).getBoundingClientRect();
      const cardHeight = cardPosition.height;
      const offset = cardPosition.top;

      const maxOpacity = 1;
      const minOpacity = 0.2;

      const calculatedOpacity = Math.max(minOpacity, maxOpacity - (offset / (window.innerHeight + cardHeight)));
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
      id={`project-${item.id}`}
      className={styles.project_card}
      key={item.id}
      onClick={() => goToDetailedView(item.id)}
      style={{ opacity }}
    >
      <svg
        className={styles.card_border}
        width="1212"
        height="297"
        viewBox="0 0 1212 297"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
           d="M3.13143 99.4156C3.13143 105.287 4.05382 117.047 3.34468 122.882C0.633961 145.188 3.13143 167.583 3.13143 189.945C3.13143 200.47 3.13184 217.747 3.13184 217.747C3.13184 217.747 3.13137 237.695 3.13137 246.749C3.13213 276.752 3.13137 265.751 3.13137 265.751C3.13137 265.751 3.34468 286.253 25.3902 288.983C32.456 289.858 56.4228 288.983 56.4228 288.983C56.4228 288.983 69.5792 288.983 80.6676 288.983C84.5061 288.983 95.3853 288.322 100.105 288.983C126.163 292.634 152.139 287.455 178.26 288.983C204.31 290.507 230.75 293.043 256.895 293.043C281.315 293.043 305.707 292.042 330.145 292.042C363.72 292.042 397.237 293.043 430.797 293.043C492.98 293.043 555.086 290.04 617.281 290.04C643.126 290.04 668.877 292.042 694.69 292.042C727.992 292.042 762.031 290.22 795.235 293.265C819.705 295.509 844.686 294.044 869.232 294.044C898.797 294.044 928.328 291.358 957.836 291.041C980.04 290.802 1007.63 290.208 1029.61 292.042C1055.44 294.197 1075.02 293.043 1100.89 293.043C1121.98 293.043 1160.36 296.423 1180.9 292.042C1193.13 289.433 1194.96 290.04 1201.75 280.252C1203.81 276.154 1204.37 271.914 1206.11 267.751C1208.12 262.954 1206.61 247.311 1207.97 242.217C1209.09 238.057 1208.4 233.044 1208.4 228.76C1208.4 222.953 1209.36 217.296 1209.36 211.466C1209.36 199.621 1209.36 187.777 1209.36 175.932C1209.36 153.435 1204.42 136.455 1207.97 114.238C1209.64 103.808 1209.36 87.8019 1209.36 77.2349C1209.36 69.3332 1211.69 34.4351 1207.97 27.2307C1197.83 7.59073 1183.81 13.7792 1162.66 12.7227C1150.83 12.132 1140.06 12.7783 1127.79 12.7783C1107.78 12.7783 1087.77 12.7783 1067.76 12.7783C1005.29 12.7783 942.776 13.7792 880.214 13.7792C838.56 13.7792 796.905 13.855 755.252 13.7792C726.304 13.7265 697.349 13.2835 668.407 12.7227C640.951 12.1907 613.671 9.59362 586.254 8.38524C550.887 6.82652 515.685 4.01315 480.324 2.37957C446.112 0.79911 412.468 2.56995 378.339 2.76883C350.626 2.93032 322.735 4.77072 295.066 4.77072C271.414 4.77072 241.592 2.76883 217.894 2.76883C176.427 2.76883 157.459 2.37919 116.066 2.37919C105.902 2.37919 80.4124 0.432228 69.5158 2.37851C69.5158 2.37851 48.267 0.628245 39.4522 2.37957C26.5722 4.93859 16.3345 4.9475 7.02318 19.2305C1.16896 28.2105 4.71516 42.4952 3.13137 53.2333C1.77309 62.4424 4.09104 73.8401 4.09104 83.3448C4.09104 86.6727 3.13143 90.1147 3.13143 93.8548C3.13143 95.7084 3.13143 97.562 3.13143 99.4156Z"
          stroke="#DD9E28"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div
        className={cn(styles.img_frame, styles.project_img_frame)}
        style={coverProjectImage(coverImg)}
      >
        <img
          src={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${item.Profile.id}/${item.id}/Project_pic.png`}
          style={{ display: "none" }}
          alt="hlopushka"
          onError={(e) => defaultImage(e)}
        />
      </div>
      <div className={styles.project_text}>
        <h1 className={styles.title4}>{item.name}</h1>
        <h2 className={styles.medium_title3}>
          {item.Profile.name} {item.Profile.lastName}
        </h2>
        <div className={styles.desc_cont}>
          <h3 className={styles.subtitle}>{item.description}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;