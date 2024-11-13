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
      <div className={styles.create}>
        <h1>Добавьте ваш проект</h1>

        <div className={styles.flex_row_input_container}>
          <div className={styles.project_name_column}>
            <h2 className="align-start accent">НАЗВАНИЕ*</h2>
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

            <h2 className="align-start accent">ОПИСАНИЕ*</h2>
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
              {/* <img
                className={styles.project_image}
                src={"/assets/77006753426b76f21dd172823dc531bc.svg"}
                alt="alt text"
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* project types */}
      <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
        ТИП ПРОЕКТА*
      </h2>
      <div className={styles.create__row}>
        {types.map((type) => (
          <button
            key={type.id}
            className={`${
              prInfo.type.id === type.id ? "button_accent" : styles.black_bg
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
        <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
          СПЕЦИАЛИСТЫ*
        </h2>
        {availableRoles.map((qual, i) => (
          <div className={styles.role_cnt} key={`role${i}`} id={`role${i}`}>
            <div className={styles.role_header}>
              <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
                СПЕЦИАЛИСТ №{i + 1}
              </h2>
              <button
                index={i}
                onClick={(e) => rmRole(e)}
                className="cross_button align-center"
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
            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              ПОПУЛЯРНОЕ
            </h2>
            <div className={styles.create__row}>
              <ul>
                {popularQualifications.map((item) => (
                  <li key={item.id}>
                    <CustomRadio
                      id={`${i}popular${item.id}`}
                      lbl={item.name}
                      name={`qualification${i}`}
                      checked={
                        qual.qualification
                          ? qual.qualification.id == item.id
                          : false
                      }
                      changeFn={(e) =>
                        changeRoleProperty(i, "qualification", item)
                      }
                      style={styles.radio_label}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* specialist experience */}
            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              СТАЖ*
            </h2>
            <div className={styles.create__row}>
              {experiences.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.experience.id === type.id
                      ? "button_accent"
                      : styles.black_bg
                  }`}
                  onClick={() => changeRoleProperty(i, "experience", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist employment */}
            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              ЗАНЯТОСТЬ*
            </h2>
            <div className={styles.create__row}>
              {employmentTypes.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.employment.id === type.id
                      ? "button_accent"
                      : styles.black_bg
                  }`}
                  onClick={() => changeRoleProperty(i, "employment", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist shift */}
            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              ВРЕМЯ СМЕНЫ*
            </h2>
            <div className={styles.create__row}>
              {shifts.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.shift.id === type.id
                      ? "button_accent"
                      : styles.black_bg
                  }`}
                  onClick={() => changeRoleProperty(i, "shift", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* specialist salary */}
            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              ОПЛАТА*
            </h2>
            <div className={styles.create__row}>
              {salaries.map((type) => (
                <button
                  key={type.id}
                  className={`${
                    qual.salary.id === type.id
                      ? "button_accent"
                      : styles.black_bg
                  }`}
                  onClick={() => changeRoleProperty(i, "salary", type)}
                >
                  {type.name}
                </button>
              ))}
            </div>

            <h2 className="uppercase accent margin_bottom_1em margin_top_1em">
              ТРЕБОВАНИЯ
            </h2>
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
      <button className="add_button align_center" onClick={addRole}>
        Добавить
      </button>
      <div className="outline_btn align-center" onClick={createProject}>
        <p>СОХРАНИТЬ</p>
        <span>СОХРАНИТЬ</span>
        <button></button>
      </div>
    </>
  );
}
