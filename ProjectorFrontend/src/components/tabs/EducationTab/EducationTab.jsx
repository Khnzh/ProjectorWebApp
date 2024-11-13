import React from "react";
import styles from "../Tabs.module.scss";
import CustomRadio from "../../customRadio/CustomRadio";

const EducationTab = ({
  education,
  setEducation,
  decrementEduQuantity,
  incrementEduQuantity,
  deleteRow,
  changeProperty,
  errors,
  mode,
  active,
  activeEdu,
}) => {
  return (
    <div
      className={styles.tab_content}
      style={{ display: active === 3 ? "flex" : "none" }}
    >
      <h1>Добавьте ваше образование</h1>

      {/* MAPS THROUGH ALL EDUCATION INSTANCES AND RENDERS THEM */}
      {education &&
        education.map((item, index) => (
          <div key={`edu${index}`} className={styles.additional_content}>
            <div className={styles.additional_content__header}>
              <h2 className="accent light">ВИД ОБРАЗОВАНИЯ*</h2>
              {index == 0 ? (
                activeEdu > 0 &&
                mode == 0 && (
                  <p
                    className={styles.delete_cell}
                    onClick={() => deleteRow("Education", education, 0)}
                  >
                    delete
                  </p>
                )
              ) : activeEdu > index ? (
                mode == 0 && (
                  <p
                    className="delete-cell"
                    onClick={() => deleteRow("Education", education, index)}
                  >
                    delete
                  </p>
                )
              ) : (
                <button
                  index={index}
                  onClick={(e) => decrementEduQuantity(e)}
                  className="cross_button"
                ></button>
              )}
            </div>
            <div>
              <CustomRadio
                id={`general${index}`}
                lbl="Основное"
                name={`eduType${index}`}
                checked={item.eduType == "general" ? true : false}
                changeFn={(e) =>
                  changeProperty(setEducation, index, "eduType", "general")
                }
                style={styles.radio__label}
              />
              <CustomRadio
                id={`additional${index}`}
                lbl="Дополнительное"
                name={`eduType${index}`}
                checked={item.eduType == "additional" ? true : false}
                changeFn={(e) =>
                  changeProperty(setEducation, index, "eduType", "additional")
                }
                style={styles.radio__label}
              />
            </div>
            {Array.isArray(errors.eduType) && errors.eduType[index] && (
              <p className="validation-message">{errors.eduType[index]}</p>
            )}
            <label htmlFor={index + "edFacility"}>
              ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*
            </label>
            <input
              onChange={(e) =>
                changeProperty(setEducation, index, "facility", e.target.value)
              }
              disabled={mode}
              type="text"
              name="edFacility"
              id={index + "edFacility"}
              defaultValue={item.facility}
              placeholder="Введите..."
            />
            {Array.isArray(errors.facility) && errors.facility[index] && (
              <p className="validation-message">{errors.facility[index]}</p>
            )}
            <label htmlFor={index + "faculty"}>ФАКУЛЬТЕТ*</label>
            <input
              onChange={(e) =>
                changeProperty(setEducation, index, "faculty", e.target.value)
              }
              disabled={mode}
              type="text"
              name="faculty"
              id={index + "faculty"}
              defaultValue={item.faculty}
              placeholder="Введите..."
            />
            {Array.isArray(errors.faculty) && errors.faculty[index] && (
              <p className="validation-message">{errors.faculty[index]}</p>
            )}
            <label htmlFor={index + "mastery"}>МАСТЕР</label>
            <input
              onChange={(e) =>
                changeProperty(setEducation, index, "mastery", e.target.value)
              }
              disabled={mode}
              type="text"
              name="mastery"
              id={index + "mastery"}
              defaultValue={item.mastery}
              placeholder="Введите..."
            />
            {Array.isArray(errors.mastery) && errors.mastery[index] && (
              <p className="validation-message">{errors.mastery[index]}</p>
            )}
            <label htmlFor={index + "enYear"}>ГОД ПОСТУПЛЕНИЯ*</label>
            <input
              onChange={(e) =>
                changeProperty(
                  setEducation,
                  index,
                  "enrollment",
                  e.target.value
                )
              }
              disabled={mode}
              type="number"
              name="enYear"
              id={index + "enYear"}
              defaultValue={item.enrollment}
              placeholder="Введите..."
            />
            {Array.isArray(errors.enrollment) && errors.enrollment[index] && (
              <p className="validation-message">{errors.enrollment[index]}</p>
            )}
            <label htmlFor={index + "gradYear"}>ГОД ВЫПУСКА*</label>
            <input
              onChange={(e) =>
                changeProperty(setEducation, index, "grad", e.target.value)
              }
              disabled={mode}
              type="number"
              name="gradYear"
              id={index + "gradYear"}
              defaultValue={item.grad}
              placeholder="Введите..."
            />
            {Array.isArray(errors.grad) && errors.grad[index] && (
              <p className="validation-message">{errors.grad[index]}</p>
            )}
            <hr></hr>
          </div>
        ))}

      {mode == 0 && (
        <p className="add_button" onClick={incrementEduQuantity}>
          Добавить
        </p>
      )}
    </div>
  );
};

export default EducationTab;
