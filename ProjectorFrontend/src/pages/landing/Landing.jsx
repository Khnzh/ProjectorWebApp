import { useState } from "react";
import styles from "./Landing.module.scss";

function Landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.container}>
        <img src="/projector.svg" alt="" className="big-header" />
        <div className={styles.landing_cmps}>
          <img src="/cloudFrame.svg" alt="" className="cloud" />
          <img src="/circlesComponent.svg" alt="" className="circles" />
          <p className={styles.cloud_text}>
            Камера, мотор… ПРОЖЕКТОР!
            <br />
            Найди подходящего специалиста сейчас!
          </p>
        </div>
        <img src="/projector.svg" alt="" className="big-header" />
        <div className={styles.landing_cmps}>
          <img src="/cloudFrame.svg" alt="" className="cloud" />
          <img src="/circlesComponent.svg" alt="" className="circles" />
          <p className={styles.cloud_text}>
            Камера, мотор… ПРОЖЕКТОР!
            <br />
            Найди подходящего специалиста сейчас!
          </p>
        </div>
        <img src="/projector.svg" alt="" className="big-header" />
        <div className={styles.landing_cmps}>
          <img src="/cloudFrame.svg" alt="" className="cloud" />
          <img src="/circlesComponent.svg" alt="" className="circles" />
          <p className={styles.cloud_text}>
            Камера, мотор… ПРОЖЕКТОР!
            <br />
            Найди подходящего специалиста сейчас!
          </p>
        </div>
      </div>
    </>
  );
}

export default Landing;
