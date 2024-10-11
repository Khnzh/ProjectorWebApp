import React from "react";
import styles from "../Tabs.module.scss";

const PortfolioTab = ({
  project,
  setProject,
  incrementProjectQuantity,
  decrementProjectQuantity,
  deleteRow,
  changeProperty,
  errors,
  mode,
  active,
  activeProjects,
}) => {
  return (
    <div
      className={styles.tab_content}
      style={{ display: active === 2 ? "flex" : "none" }}
    >
      <h1>Добавьте ваш проект</h1>

      {/* MAPS THROUGH ALL PROJECT INSTANCES AND RENDERS THEM */}
      {project &&
        project.map((item, index) => (
          <div key={`portf${index}`} className={styles.additional_edu}>
            <div className={styles.edu_header}>
              <label htmlFor={index + "prName"}>НАЗВАНИЕ*</label>
              {index == 0 ? (
                activeProjects > 0 &&
                mode == 0 && (
                  <p
                    className={styles.delete_cell}
                    onClick={() => deleteRow("Portfolio", project, index)}
                  >
                    delete
                  </p>
                )
              ) : activeProjects > index ? (
                mode == 0 && (
                  <p
                    className={styles.delete_cell}
                    onClick={() => deleteRow("Portfolio", project, index)}
                  >
                    delete
                  </p>
                )
              ) : (
                <button
                  index={index}
                  onClick={(e) => decrementProjectQuantity(e)}
                  className="cross_button"
                ></button>
              )}
            </div>
            <input
              onChange={(e) =>
                changeProperty(setProject, index, "name", e.target.value)
              }
              disabled={mode}
              type="text"
              name="prName"
              id={index + "prName"}
              defaultValue={item.name}
            />
            {Array.isArray(errors.prName) && errors.prName[index] && (
              <p className="validation-message">{errors.prName[index]}</p>
            )}
            <label htmlFor={index + "prDesc"}>ОПИСАНИЕ</label>
            <textarea
              onChange={(e) =>
                changeProperty(setProject, index, "desc", e.target.value)
              }
              disabled={mode}
              name="prDesc"
              id={index + "prDesc"}
              defaultValue={item.desc}
            ></textarea>
            {Array.isArray(errors.desc) && errors.desc[index] && (
              <p className="validation-message">{errors.desc[index]}</p>
            )}
            <label htmlFor={index + "prRole"}>РОЛЬ В ПРОЕКТЕ*</label>
            <input
              onChange={(e) =>
                changeProperty(setProject, index, "role", e.target.value)
              }
              disabled={mode}
              type="text"
              name="prRole"
              id={index + "prRole"}
              defaultValue={item.role}
            />
            {Array.isArray(errors.role) && errors.role[index] && (
              <p className="validation-message">{errors.role[index]}</p>
            )}
            <label htmlFor={index + "prLink"}>ССЫЛКА</label>
            <input
              onChange={(e) =>
                changeProperty(setProject, index, "link", e.target.value)
              }
              disabled={mode}
              type="text"
              name="prLink"
              id={index + "prLink"}
              defaultValue={item.link}
            />
            {Array.isArray(errors.link) && errors.link[index] && (
              <p className="validation-message">{errors.link[index]}</p>
            )}
            <label htmlFor={index + "prYear"}>ГОД*</label>
            <input
              onChange={(e) =>
                changeProperty(setProject, index, "year", e.target.value)
              }
              disabled={mode}
              type="number"
              name="prYear"
              id={index + "prYear"}
              defaultValue={item.year}
            />
            {Array.isArray(errors.year) && errors.year[index] && (
              <p className="validation-message">{errors.year[index]}</p>
            )}
            <hr></hr>
          </div>
        ))}

      {mode == 0 && (
        <button className="add_button" onClick={incrementProjectQuantity}>
          Добавить
        </button>
      )}
    </div>
  );
};

export default PortfolioTab;
