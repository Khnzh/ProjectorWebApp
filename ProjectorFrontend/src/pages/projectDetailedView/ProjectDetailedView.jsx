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
