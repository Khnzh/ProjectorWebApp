import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCreate.module.scss";
import { useNavigate } from "react-router-dom";
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
import supabase from "../../config/supabaseClient";

export default function ProjectCreate() {
  const [prInfo, setPrInfo] = useState({
    name: undefined,
    description: undefined,
    type: types[0],
  });

  const navigate = useNavigate();

  const popup = useRef();

  const [uId, setUId] = useState(null);
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";

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

  const serializeRoles = (id) => {
    const resultArr = availableRoles.map((item) => {
      let result = {};
      result.requirements = item.requirements;
      for (const _ in item) {
        if (_ !== "requirements") result[`${_}`] = item[`${_}`].name;
      }
      delete result.qualification;
      result.qualification_id = item.qualification.id;
      result.project_id = id;
      return result;
    });
    return resultArr;
  };

  const createProject = async () => {
    const { data: pId, error: pIdError } = await supabase.rpc("profile_id", {
      p_user_id: uId,
    });

    if (pIdError) {
      console.error("Error calling function:", pIdError);
    } else {
      console.log("Function result:", pId);
    }

    const { data, error } = await supabase
      .from("Projects")
      .insert([
        {
          name: prInfo["name"],
          description: prInfo["description"],
          user_id: uId,
          promotion: "z",
          type: prInfo["type"],
          profile_id: pId,
        },
      ])
      .select("id");
    !error ? console.log(data[0].id) : console.log(error);

    const { data: prData, error: prError } = await supabase
      .from("Projects")
      .insert([
        {
          name: prInfo["name"],
          description: prInfo["description"],
          user_id: uId,
          promotion: "z",
          type: prInfo["type"],
          profile_id: pId,
        },
      ])
      .select("id");
    !prError ? console.log(prData[0].id) : console.log(prError);

    const qualsList = serializeRoles(prData[0].id);
    console.log(qualsList);

    const { data: qualData, error: qualError } = await supabase
      .from("project_qualifications")
      .insert(qualsList)
      .select();
    if (!qualError) {
      console.log(qualData);
      popup.current.style.display = "flex";
      setTimeout(() => navigate("/projects"), 1500);
    } else {
      console.log(qualError);
    }
  };

  const changeRoleProperty = (i, property, value) =>
    setAvailableRoles((ar) => {
      let updatedRoles = [...ar];

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

  const rmRole = (e) =>
    setAvailableRoles((ar) => {
      let availableRolesCopy = [...ar];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedRoles = availableRolesCopy.filter((item, index) => {
        if (index != e.target.getAttribute("index")) return item;
      });

      return updatedRoles; // Return the new
    });

  useEffect(() => {
    console.log(availableRoles);
  }, [availableRoles]);
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem(localKey));
    setUId((u) => info.user.id);
  }, []);

  return (
    <>
      <div className={styles.popup} ref={popup}>
        <div className={styles.succes_message}>
          <p>Succes!</p>
        </div>
      </div>
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
      <div className={styles.roles_cnt}>
        <h1 className={styles.project_type_label}>СПЕЦИАЛИСТЫ*</h1>
        {availableRoles.map((qual, i) => (
          <div className={styles.role_cnt} key={`role${i}`} id={`role${i}`}>
            <div className={styles.role_header}>
              <h1 className={styles.project_type_label}>СПЕЦИАЛИСТ №{i + 1}</h1>
              <button
                index={i}
                onClick={(e) => rmRole(e)}
                className={styles.role_deletion_button}
              ></button>
            </div>
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
                      i={i}
                      id={`${i}popular${item.id}`}
                      name={`qualification${i}`}
                      checked={
                        qual.qualification
                          ? qual.qualification.id == item.id
                          : false
                      }
                      item={item}
                      changeRoleProperty={changeRoleProperty}
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
          </div>
        ))}
      </div>
      <button className={styles.add_role} onClick={addRole}>
        Добавить
      </button>
      <button
        onClick={createProject}
        className={styles.save_button}
        data-content="СОХРАНИТЬ"
      ></button>
    </>
  );
}
