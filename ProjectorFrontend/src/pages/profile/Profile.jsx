import styles from "./Profile.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import {
  profileValidation,
  portfolioValidation,
  educationValidation,
  hasOnlySpecificStrings,
} from "../../utilityFunctions/Validation";
import { useAuth } from "../../context/AuthContext";
import EducationTab from "../../components/tabs/EducationTab/EducationTab";
import PortfolioTab from "../../components/tabs/PortfolioTab/PortfolioTab";
import { unauthorizedRedirect } from "../../utilityFunctions/unauthorizedRedirect";
import GeneralTab from "../../components/tabs/GeneralTab/GeneralTab";

export default function Profile() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/login");
  // }, [isLoggedIn]);
  //FETCHING PARAMS
  const [errors, setErrors] = useState({});
  const { emode } = useParams();
  const [activeEdu, setActiveEdu] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);

  // SETTING MODE FROM URL 0 = VIEW, 1 = EDIT AND UPDATE
  useEffect(() => {
    if (emode !== "0") setMode(false);
  }, [emode]);

  // localStorage and state variables
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const [uId, setUId] = useState(null);
  const [pId, setPId] = useState(null);
  const [email, setEmail] = useState(null);
  const [mode, setMode] = useState(true);

  // PROFILE VARIABLES
  const [selectedCountry, setSelectedCountry] = useState({});
  const [innerText, setInnerText] = useState("");
  const [showList, setShowList] = useState(false);
  const selectCountry = useRef(null);

  useEffect(
    () => unauthorizedRedirect(isLoggedIn, setIsLoggedIn, navigate),
    [isLoggedIn, setIsLoggedIn, navigate]
  );
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    bio: "",
    langs: [],
    phNumber: "",
    socials: "",
    specialties: [],
    tg: "",
  });

  // PROFILE INPUT DATA FETCHING
  const inputProfile = (property, e) =>
    setProfile((prev) => {
      const { value } = e.target;
      let res = { ...prev };
      res[property] = value.trim();
      return res;
    });

  // PORTFOLIO FIELD VARIABLES
  const [project, setProject] = useState([
    {
      name: "",
      desc: "",
      role: "",
      link: "",
      year: "",
      id: "",
    },
  ]);

  //Portfolio methods
  const incrementProjectQuantity = () => {
    if (project.length < 5)
      setProject((p) => {
        let resArr = [...p];
        resArr.push({
          name: "",
          desc: "",
          role: "",
          link: "",
          year: "",
          id: "",
        });
        return resArr;
      });
  };

  const decrementProjectQuantity = (e) =>
    setProject((p) => {
      let projectCopy = [...p];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedProject = projectCopy.filter((item, index) => {
        if (index != e.target.getAttribute("index")) return item;
      });

      return updatedProject; // Return the new
    });

  // EDUCATION FIELD VARIABLES
  const [education, setEducation] = useState([
    {
      mastery: "",
      eduType: "",
      enrollment: "",
      facility: "",
      faculty: "",
      grad: "",
      id: "",
    },
  ]);

  //Education methods
  const incrementEduQuantity = () => {
    if (education.length < 5)
      setEducation((e) => {
        let resArr = [...e];
        resArr.push({
          mastery: "",
          eduType: "",
          enrollment: "",
          facility: "",
          faculty: "",
          grad: "",
          id: "",
        });
        return resArr;
      });
  };

  const decrementEduQuantity = (e) =>
    setEducation((ed) => {
      let educationCopy = [...ed];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedEducation = educationCopy.filter((item, index) => {
        if (index != e.target.getAttribute("index")) return item;
      });

      return updatedEducation; // Return the new
    });
  // PORTFOLIO AND EDUCATION INPUT DATA FETCHING
  const changeProperty = (stateSetter, i, property, value) =>
    stateSetter((ar) => {
      let updatedProjects = [...ar];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedProject = { ...updatedProjects[i] };

      // Update the property with the new value
      updatedProject[property] = value;

      // Replace the Project in the array with the updated one
      updatedProjects[i] = updatedProject;

      return updatedProjects; // Return the new
    });

  // FETCHING PORTFOLIO INFORMATION FROM DATABASE

  const fetchPortfolio = async (pId) => {
    let { data: Portfolio, error } = await supabase
      .from("Portfolio")
      .select("name, desc, role, link, year, id")
      // Filters
      .eq("profile_id", pId);

    if (error) {
      console.log(error);
    } else {
      setActiveProjects(Portfolio.length);

      if (Portfolio.length > 0) {
        setProject(() => {
          let resArr = [];
          for (let i = 0; i < Portfolio.length; i++) {
            resArr.push(Portfolio[i]);
          }
          return resArr;
        });
      }
    }
  };

  // FETCHING EDUCATION INFORMATION FROM DATABASE

  const fetchEducation = async (pId) => {
    let { data: Education, error } = await supabase
      .from("Education")
      .select("mastery, eduType, enrollment, facility, faculty, grad, id")
      // Filters
      .eq("profile_id", pId);

    if (error) {
      console.log(error);
    } else {
      setActiveEdu(Education.length);
      if (Education.length > 0) {
        setEducation(() => {
          let resArr = [];
          for (let i = 0; i < Education.length; i++) {
            resArr.push(Education[i]);
          }
          return resArr;
        });
      }
    }
  };

  // FETCHING PROFILE INFORMATION FROM DATABASE

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem(localKey));
    setUId((u) => info.user.id);
    setEmail((e) => info.user.email);

    const fetchProfile = async () => {
      let { data: Profile, error } = await supabase
        .from("Profile")
        .select("*")
        // Filters
        .eq("user_id", uId);
      setProfile((p) => {
        return { ...p, name: Profile[0].name };
      });
      setProfile((p) => {
        return { ...p, lastName: Profile[0].lastName };
      });
      setProfile((p) => {
        return { ...p, bio: Profile[0].bio };
      });
      setProfile((p) => {
        return { ...p, phNumber: Profile[0].phoneNumber };
      });
      setProfile((p) => {
        return { ...p, socials: Profile[0].socials };
      });
      setProfile((p) => {
        return { ...p, tg: Profile[0].telegram };
      });
      setPId(Profile[0].id);
      localStorage.setItem("profile", Profile[0].id);
    };

    const fetchLangs = async () => {
      const { data, error } = await supabase
        .from("user_language")
        .select("language_id(*)")
        .eq("profile_id", pId);
      if (error) {
        console.log(error);
      } else {
        const langsData = data.map((item) => item.language_id);
        setProfile((p) => {
          return { ...p, langs: langsData };
        });
      }
    };

    const fetchSpecs = async () => {
      const { data, error } = await supabase
        .from("user_qualification")
        .select("qualification_id(*)")
        .eq("profile_id", pId);
      if (error) {
        console.log(error);
      } else {
        const specsData = data.map((item) => item.qualification_id);
        setProfile((p) => {
          return { ...p, specialties: specsData };
        });
      }
    };

    if (uId && email) {
      fetchProfile();
    }
    if (pId) {
      fetchProfile();
      fetchLangs();
      fetchSpecs();
      fetchPortfolio(pId);
      fetchEducation(pId);
    }
  }, [uId, pId]);

  // UPDATING AND EDITING PROFILE

  const updateProfile = async () => {
    const { data, error } = await supabase
      .from("Profile")
      .update([
        {
          name: profile.name,
          lastName: profile.lastName,
          bio: profile.bio,
          phoneNumber: profile.phNumber,
          telegram: profile.tg,
          socials: profile.socials,
        },
      ])
      .eq("user_id", uId)
      .select();
    error && console.log(error);

    const multiSelectQuery = (value, specification) => {
      let list = "[";

      for (let o = 0; o < value.length; o++) {
        if (o == value.length - 1) {
          list =
            list +
            `{"user_id": "${uId}","${specification}_id": ${value[o].id}}]`;
        } else {
          list =
            list +
            `{"user_id": "${uId}","${specification}_id": ${value[o].id}},`;
        }
      }
      return list;
    };

    const langsList = multiSelectQuery(profile.langs, "language");

    const { error: langsErr } = await supabase
      .from("user_languages")
      .delete()
      .eq("user_id", uId)
      .select();
    if (langsErr) console.log(langsErr);

    const { error: langsInsErr } = await supabase
      .from("user_languages")
      .insert(JSON.parse(langsList))
      .select();
    if (langsInsErr) console.log(langsInsErr);

    const specsList = multiSelectQuery(profile.specialties, "qualification");

    const { error: specsErr } = await supabase
      .from("user_qualifications")
      .delete()
      .eq("user_id", uId)
      .select();
    if (specsErr) console.log(specsErr);

    const { error: specsInsErr } = await supabase
      .from("user_qualifications")
      .insert(JSON.parse(specsList))
      .select();
    if (specsInsErr) console.log(specsInsErr);
    navigate("/profile/0");
  };
  // UPDATING AND EDITING PORTFOLIO

  const saveChangesToTable = async (srcData, table, base) => {
    srcData.map(async (item, index) => {
      let updProject = { ...item };
      updProject.user_id = uId;
      if (base && index < base) {
        const { data, error } = await supabase
          .from(table)
          .update(updProject)
          .eq("id", updProject.id)
          .select();
        error && console.log(error);
      } else {
        delete updProject.id;
        const { data: insData, error: specsInsErr } = await supabase
          .from(table)
          .insert(updProject)
          .select();
        specsInsErr && console.log(specsInsErr);
      }
    });
    table == "Portfolio" ? fetchPortfolio(uId) : fetchEducation(uId);
  };

  // DELETING EDUCATION OR PORTFOLIO INSTANCE, DEPENDS ON INPUT PARAMETERS

  const deleteRow = async (table, value, index) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", value[index]["id"])
      .select();
    if (error) {
      console.log(error);
    } else {
      table === "Education" ? fetchEducation(uId) : fetchPortfolio(uId);
    }
  };

  // SAVES CHANGES AFTER VALIDATING INPUTS

  const saveChanges = () => {
    let errs;
    switch (active) {
      case 1:
        errs = profileValidation(profile);
        if (hasOnlySpecificStrings(errs, "") || !errs) updateProfile();
        break;
      case 2:
        errs = portfolioValidation(project);
        if (hasOnlySpecificStrings(errs, "") || !errs)
          saveChangesToTable(project, "Portfolio", activeProjects);
        break;
      case 3:
        errs = educationValidation(education);
        if (hasOnlySpecificStrings(errs, "") || !errs)
          saveChangesToTable(education, "Education", activeEdu);
        break;
    }
    setErrors(errs);
  };

  // RESPONSIBLE FOR DISPLAYING THE CORRECT TAB

  const [active, setActive] = useState(1);
  const changeActive = (n) => {
    setActive((a) => n);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profile__tabs}>
          <div
            onClick={() => changeActive(1)}
            className={
              active === 1 ? styles.active_tab : styles.profile__tabs_header
            }
          >
            <p>О себе</p>
          </div>
          <div
            onClick={() => changeActive(2)}
            className={
              active === 2 ? styles.active_tab : styles.profile__tabs_header
            }
          >
            <p>Портфолио</p>
          </div>
          <div
            onClick={() => changeActive(3)}
            className={
              active === 3 ? styles.active_tab : styles.profile__tabs_header
            }
          >
            <p>Образование</p>
          </div>
        </div>

        {/* GENERAL INFORMATION */}
        <GeneralTab
          active={active}
          uId={uId}
          profile={profile}
          inputProfile={(property, e) => inputProfile(property, e)}
          setProfile={setProfile}
          mode={mode}
          errors={errors}
          email={email}
          innerText={innerText}
          setInnerText={setInnerText}
          showList={showList}
          setShowList={setShowList}
          selectCountry={selectCountry}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        {/* EDUCATION */}
        <EducationTab
          education={education}
          setEducation={setEducation}
          decrementEduQuantity={decrementEduQuantity}
          incrementEduQuantity={incrementEduQuantity}
          deleteRow={deleteRow}
          changeProperty={changeProperty}
          errors={errors}
          mode={mode}
          active={active}
          activeEdu={activeEdu}
        />

        {/* PORTFOLIO */}
        <PortfolioTab
          project={project}
          setProject={setProject}
          decrementProjectQuantity={decrementProjectQuantity}
          incrementProjectQuantity={incrementProjectQuantity}
          deleteRow={deleteRow}
          changeProperty={changeProperty}
          errors={errors}
          mode={mode}
          active={active}
          activeProjects={activeProjects}
        />

        {mode ? (
          <div
            className="outline_btn align-center"
            onClick={() => navigate("/profile/1")}
          >
            <p>ИЗМЕНИТЬ</p>
            <span>ИЗМЕНИТЬ</span>
            <button></button>
          </div>
        ) : (
          <div className="outline_btn align-center" onClick={saveChanges}>
            <p>СОХРАНИТЬ</p>
            <span>СОХРАНИТЬ</span>
            <button></button>
          </div>
        )}
      </div>
    </>
  );
}
