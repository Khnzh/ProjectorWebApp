import { useEffect, useState } from "react";
import styles from "./ProjectCreate.module.scss";
import {
  employmentTypes,
  experiences,
  popularQualifications,
  qualifications,
  salaries,
  shifts,
  types,
} from "../../utilityFunctions/utilityObjects";
import CustomRadio from "../../components/customRadio/CustomRadio";
import FilterInput from "../../components/filterInput/FilterInput";

export default function ProjectCreate() {
  const [prInfo, setPrInfo] = useState({
    name: undefined,
    description: undefined,
    type: types[0],
  });

  const [checked, setChecked] = useState(false);

  const [availableRoles, setAvailableRoles] = useState([
    {
      qualification: qualifications[0],
      experience: experiences[0],
      employment: employmentTypes[0],
      shift: shifts[0],
      salary: salaries[0],
      requirements: "",
    },
  ]);

  const changeRoleProperty = (i, property, value) =>
    setAvailableRoles((ar) => {
      let updatedRoles = [...ar];
      console.log(`${updatedRoles}`);

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedRole = { ...updatedRoles[i] };

      // Update the property with the new value
      updatedRole[property] = value;

      // Replace the role in the array with the updated one
      updatedRoles[i] = updatedRole;

      return updatedRoles; // Return the new
    });

  const addRole = () =>
    setAvailableRoles((ar) => {
      let updatedRoles = [...ar];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedRole = { ...updatedRoles[0] };

      // Replace the role in the array with the updated one
      updatedRoles.push(updatedRole);

      return updatedRoles; // Return the new
    });

  useEffect(() => console.log(availableRoles), [availableRoles]);

  return (
    <>
      <div className={styles.project_detail_column}>
        <h1
          className={styles.project_add_title}
          onClick={() => console.log(availableRoles)}
        >
          Добавьте ваш проект
        </h1>

        <div className={styles.flex_row_input_container}>
          <div className={styles.project_name_column}>
            <h1 className={styles.project_name_label}>НАЗВАНИЕ*</h1>
            <input
              onChange={(e) =>
                setPrInfo((s) => {
                  return { ...s, name: e.target.value };
                })
              }
              type="text"
              name="name"
              id="name"
              placeholder="Введите..."
            />

            <h1 className={styles.project_description_label}>ОПИСАНИЕ*</h1>
            <input
              onChange={(e) =>
                setPrInfo((s) => {
                  return { ...s, description: e.target.value };
                })
              }
              type="text"
              name="description"
              id="description"
              placeholder="Введите..."
            />
          </div>

          <div className={styles.image_display_column}>
            <div className={styles.project_image_comment}>
              <img
                className={styles.project_image}
                src={"/assets/77006753426b76f21dd172823dc531bc.svg"}
                alt="alt text"
              />
            </div>
          </div>
        </div>
      </div>
      {/* project types */}
      <h1 className={styles.project_type_label}>ТИП ПРОЕКТА*</h1>
      <div className={styles.project_type_column}>
        {types.map((type) => (
          <button
            key={type.id}
            className={`${
              prInfo.type.id === type.id ? styles.button_accent : ""
            }`}
            onClick={() =>
              setPrInfo((s) => {
                return { ...s, type };
              })
            }
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* popular qualifications */}
      <div className={styles.helic}>
        <h1 className={styles.project_type_label}>СПЕЦИАЛИСТЫ*</h1>
        {availableRoles.map((qual, i) => (
          <div className={styles.role_cnt} key={`role${i}`} id={`role${i}`}>
            <button className={styles.wtf}>+ specialist</button>
            <FilterInput
              pageStyles={[
                styles.qual_input,
                styles.qual_opts,
                styles.qual_opt,
              ]}
              i={"qualification"}
              data={qualifications}
              selected={availableRoles}
              setSelected={setAvailableRoles}
              iteration={i}
            />
            <h1 className={styles.project_type_label}>ПОПУЛЯРНОЕ</h1>
            <div className={styles.project_type_column}>
              <ul>
                {popularQualifications.map((item) => (
                  <li key={item.id}>
                    <CustomRadio
                      click={() => setChecked((s) => !s)}
                      change={(e) => console.log(e)}
                      id={item.id}
                      name={"qualification"}
                      checked={checked}
                      lblValue={item.name}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* specialist experience */}
            <h1 className={styles.project_type_label}>СТАЖ*</h1>
            <div className={styles.project_type_column}>
              {experiences.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.experience.id === type.id ? styles.button_accent : ""
                  }`}
                  onClick={() => changeRoleProperty(i, "experience", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist employment */}
            <h1 className={styles.project_type_label}>ЗАНЯТОСТЬ*</h1>
            <div className={styles.project_type_column}>
              {employmentTypes.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.employment.id === type.id ? styles.button_accent : ""
                  }`}
                  onClick={() => changeRoleProperty(i, "employment", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist shift */}
            <h1 className={styles.project_type_label}>ВРЕМЯ СМЕНЫ*</h1>
            <div className={styles.project_type_column}>
              {shifts.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.shift.id === type.id ? styles.button_accent : ""
                  }`}
                  onClick={() => changeRoleProperty(i, "shift", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist salary */}
            <h1 className={styles.project_type_label}>ОПЛАТА*</h1>
            <div className={styles.project_type_column}>
              {salaries.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.salary.id === type.id ? styles.button_accent : ""
                  }`}
                  onClick={() => changeRoleProperty(i, "salary", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            <h1 className={styles.project_name_label}>ТРЕБОВАНИЯ</h1>
            <textarea
              type="text"
              placeholder="Введите..."
              onChange={(e) =>
                changeRoleProperty(i, "requirements", e.target.value)
              }
            />
            <button onClick={addRole} className={styles.wtf_b}>
              + specialist
            </button>
          </div>
        ))}
      </div>
      <button className={styles.save_button} data-content="СОХРАНИТЬ"></button>
    </>
  );
}
