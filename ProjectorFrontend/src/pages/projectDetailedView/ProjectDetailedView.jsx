import React from "react";
import styles from "./ProjectDetailedView.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import cn from "classnames";

const ProjectDetailedView = () => {
  const { prId } = useParams();

  const [projectInfo, setProjectInfo] = useState();
  const [active, setActive] = useState(null);

  const coverProjectImage = (imgURL) => {
    return {
      backgroundImage: `url('${imgURL}')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  };

  function defaultImage(e) {
    e.target.style = { display: "block" };
    e.target.src = "/assets/hlopushka.svg";
  }

  useEffect(() => {
    if (prId)
      (async (prId) => {
        const { data, error } = await supabase
          .from("Projects")
          .select(
            `
              id,
              name,
              description,
              type,
              created_at,
              Profile ( id, name, lastName ),
              project_qualifications( qualification_id(id, name), experience, employment, shift, salary, requirements)
            `
          )
          .eq("id", prId);

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setProjectInfo(data);
        }
      })(prId);
  }, []);

  return projectInfo ? (
    <div className={styles.detailed}>
      <h1>{projectInfo[0].name}</h1>
      <div className={styles.float_image}>
        <div
          className={cn("img_frame", styles.bigger_img)}
          style={coverProjectImage(
            `https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${projectInfo[0].Profile.id}/${projectInfo[0].id}/Project_pic.png`
          )}
        >
          <svg
            className="save_svg_outline"
            width="51"
            height="60"
            viewBox="0 0 51 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              d="M13.0928 45.2632C16.5547 50.9937 21.8331 57.6367 21.8331 57.6367C24.873 55.1367 31.7791 44.0076 34.1665 40.6755C40.5742 31.7323 47.8615 22.0263 49.0681 10.7137C49.9004 2.91087 44.4961 0.621925 37.6565 3.70817C29.8691 7.22208 25.8793 15.9417 23.3707 23.6079C23.1429 24.3043 22.6097 27.6935 21.8331 25.3502C21.0552 23.003 20.4166 20.6447 19.4622 18.3533C17.4295 13.473 13.4064 5.11764 6.90558 5.42906C-0.155697 5.76734 1.54686 17.8848 2.42256 22.0322C4.18424 30.3758 8.73817 38.0549 13.0928 45.2632Z"
              stroke="#DD9E28"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <img
            src={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${projectInfo[0].Profile.id}/${projectInfo[0].id}/Project_pic.png`}
            style={{ display: "none" }}
            alt="hlopushka"
            onError={(e) => defaultImage(e)}
          />
        </div>
        <p>
          автор:{" "}
          <span>
            {projectInfo[0].Profile.name} {projectInfo[0].Profile.lastName}
          </span>
        </p>
      </div>
      <div className={styles.qualifications_cont}>
        {projectInfo[0].project_qualifications.map((item, index) => (
          <button
            key={item.qualification_id.name}
            className={styles.qualification}
            onClick={() => setActive(index)}
          >
            {item.qualification_id.name}
          </button>
        ))}
      </div>
      <h2>ОПИСАНИЕ</h2>
      <p>{projectInfo[0].description}</p>
      <h2>ТИП ПРОЕКТА</h2>
      <p>{projectInfo[0].type}</p>
      <h2>ФАЙЛ ПРОЕКТА</h2>
      {projectInfo[0].project_qualifications.map((item, index) => (
        <div
          className={styles.filter_cont}
          key={item.qualification_id.id}
          style={{ display: active === index ? "flex" : "none" }}
        >
          <button
            className={styles.close_filter_cont}
            onClick={() => setActive(null)}
          />
          <h1>СТАЖ</h1>
          <div className={styles.qualification_details}>{item.experience}</div>
          <h1>ЗАНЯТОСТЬ</h1>
          <div className={styles.qualification_details}>{item.employment}</div>
          <h1>ВРЕМЯ СМЕНЫ</h1>
          <div className={styles.qualification_details}>{item.shift}</div>
          <h1>ОПЛАТА</h1>
          <div className={styles.qualification_details}>{item.salary}</div>
          {item.requirements && (
            <>
              <h1>ТРЕБОВАНИЯ</h1>
              <div
                className={cn(
                  styles.qualification_details,
                  styles.requirements
                )}
                dangerouslySetInnerHTML={{
                  __html: item.requirements.replace(/\n/g, "<br />"),
                }}
              ></div>
            </>
          )}
        </div>
      ))}
    </div>
  ) : (
    <h1>Project not found</h1>
  );
};

export default ProjectDetailedView;
