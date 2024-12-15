import React, { useEffect, useState, useRef } from "react";
import {
  qualifications,
  experiences,
  types,
  employmentTypes,
  shifts,
  salaries,
} from "../../utilityFunctions/utilityObjects";
import cn from "classnames";
import supabase from "../../config/supabaseClient";
import SvgContainer from "../../components/Svg/SvgContainer";
import styles from "./ProjectDisplay.module.scss";
import {
  useSearchParams,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAuth } from "../../context/AuthContext";
import ProjectCard from "../../components/projectCard/ProjectCard";

import SearchSelect from "../../components/searchSelect/SearchSelect";
import Loader from "../../components/loader/Loader";

function ProjectDisplay({ specific }) {
  //queries collection
  const BASE_QUERY = {
    all: {
      count: () => {
        return supabase
          .from("Projects")
          .select("*", { count: "exact", head: true });
      },
      fetch: () => {
        return (
          supabase
            .from("Projects")
            .select(
              `
      id,
      name,
      description,
      created_at,
      Profile ( id, name, lastName ),
      project_qualifications!inner( 
        qualification_id!inner(name), 
        experience, 
        employment, 
        shift, 
        salary
      )
    `,
              { count: "exact" }
            ) // Request the exact count of matching rows
            //.eq("profile_id", "555") // для проверок роняет проекты
            .order("promotion", { ascending: true })
            .order("id", { ascending: true })
        );
      },
      urlQuery: (item) => {
        return `/projects${
          item.page === 1 ? "" : `?page=${item.page}`
        }${objectToQueryString(
          Object.fromEntries(searchParams.entries()),
          item.page
        )}`;
      },
    },

    mine: {
      count: (id) => {
        return supabase
          .from("Projects")
          .select("*", { count: "exact", head: true })
          .eq("profile_id", id);
      },
      fetch: (id) => {
        return supabase
          .from("Projects")
          .select(
            `
        id,
          name,
          description,
          type,
          created_at,
          Profile ( id, name, lastName ),
          project_qualifications!inner( 
            qualification_id!inner(name), 
            experience, 
            employment, 
            shift, 
            salary
        )
        `,
            { count: "exact" }
          ) // Request the exact count of matching rows
          .order("id", { ascending: true })
          .eq("profile_id", id);
      },
      urlQuery: (item) => {
        return `/projects/mine${
          item.page === 1 ? "" : `?page=${item.page}`
        }${objectToQueryString(
          Object.fromEntries(searchParams.entries()),
          item.page
        )}`;
      },
    },

    saved: {
      count: (id) => {
        return supabase
          .from("Saved_projects")
          .select("*", { count: "exact", head: true })
          .eq("profile_id", id);
      },
      fetch: (id) => {
        return supabase
          .from("Saved_projects")
          .select(
            `
        Projects!inner(id,
          name,
          description,
          type,
          created_at,
          Profile ( id, name, lastName ),
          project_qualifications!inner( 
            qualification_id!inner(name), 
            experience, 
            employment, 
            shift, 
            salary
        ))
        `,
            { count: "exact" }
          ) // Request the exact count of matching rows
          .order("project_id", { ascending: true })
          .eq("profile_id", id);
      },
      urlQuery: (item) => {
        return `/projects/saved${
          item.page === 1 ? "" : `?page=${item.page}`
        }${objectToQueryString(
          Object.fromEntries(searchParams.entries()),
          item.page
        )}`;
      },
    },
  };

  // constants
  const { pId } = useParams();
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const perPage = 5;
  const navigate = useNavigate();

  // state variables
  const { isLoggedIn } = useAuth();
  const [uId, setUId] = useState(null);
  const [searchFilter, setSearchFilter] = useState();
  const [projectInfo, setProjectInfo] = useState(null);
  const [filters, setFilters] = useState([
    {
      qualification: "",
      type: "",
      experience: "",
      emplType: "",
      shift: "",
      salary: "",
      searchPattern: "",
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [total, setTotal] = useState();

  // references
  const filterContRef = useRef();

  //FUNCTIONS
  function setSearchPattern(e) {
    setFilters((ar) => {
      let updatedRoles = [...ar];

      // Create a shallow copy of the specific role object that needs to be updated
      let updatedRole = { ...updatedRoles[0] };

      // Update the property with the new value
      updatedRole["searchPattern"] = e.target.value.trim();

      // Replace the role in the array with the updated one
      updatedRoles[0] = updatedRole;

      return updatedRoles; // Return the new
    });
  }

  function clearFilters() {
    setFilters([
      {
        qualification: "",
        type: "",
        experience: "",
        emplType: "",
        shift: "",
        salary: "",
        searchPattern: "",
      },
    ]);
    applyFilter();
  }

  // Function querying projects with different filters
  async function queryProjects(supabase, filters, start, end, id = null) {
    // Start the query with the required project fields and project_qualifications
    let query = BASE_QUERY[specific].fetch(id);
    query = query.range(start, end); // Pagination using start and end

    // Apply filters on Projects if they are present
    if (filters.type) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq("type", filters.type))
        : (query = query.eq("Projects.type", filters.type)); // Filter by project type
    }

    // Apply filters on project_qualifications fields
    if (filters.qualification) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq(
            "project_qualifications.qualification_id.name",
            filters.qualification
          ))
        : (query = query.eq(
            "Projects.project_qualifications.qualification_id.name",
            filters.qualification
          ));
    }

    if (filters.experience) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq(
            "project_qualifications.experience",
            filters.experience
          ))
        : (query = query.eq(
            "Projects.project_qualifications.experience",
            filters.experience
          )); // Filter by experience
    }
    if (filters.emplType) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq(
            "project_qualifications.employment",
            filters.emplType
          ))
        : (query = query.eq(
            "Projects.project_qualifications.employment",
            filters.emplType
          )); // Filter by employment type
    }
    if (filters.shift) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq("project_qualifications.shift", filters.shift))
        : (query = query.eq(
            "Projects.project_qualifications.shift",
            filters.shift
          ));
    }
    if (filters.salary) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.eq("project_qualifications.salary", filters.salary))
        : (query = query.eq(
            "Projects.project_qualifications.salary",
            filters.salary
          ));
    }
    if (filters.searchPattern) {
      console.log(filters.type);
      specific !== "saved"
        ? (query = query.like("name", `%${filters.searchPattern}%`))
        : (query = query.like("Projects.name", `%${filters.searchPattern}%`)); // Filter by salary
    }
    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return null;
    }

    return {
      projects: data, // The filtered projects
      totalCount: count, // Total count of projects that match the filters
    };
  }

  // function for showing filter popup
  const toggleFilter = () => {
    filterContRef.current.style.display == "none"
      ? (filterContRef.current.style.display = "flex")
      : (filterContRef.current.style.display = "none");
  };

  // function for fetching projects according to filters
  function applyFilter() {
    setSearchParams((previous) => {
      let existingFilters = {};
      const destrFilters = filters[0];
      if (destrFilters.searchPattern) {
        existingFilters.searchPattern = destrFilters.searchPattern;
      }
      for (const [key, value] of Object.entries(destrFilters)) {
        if (key !== "searchPattern" && value) {
          existingFilters[key] = value["name"];
        }
      }

      return {
        page: "1",
        ...existingFilters,
      };
    });
    setPage(1);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      applyFilter();
    }
  }

  // converts filters object to url query
  function objectToQueryString(filters, page) {
    const queryString = Object.keys(filters)
      .filter(
        (key) =>
          filters[key] !== null && filters[key] !== undefined && key != "page"
      ) // Filter out null/undefined fields
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
      ) // Encode key and value
      .join("&"); // Join them with '&'

    if (queryString) {
      if (page == 1) {
        return `?${queryString}`;
      } else {
        return `&${queryString}`;
      }
    } else {
      return "";
    } // Return the query string
  }

  //Counts projects quantity to define how many pages it will need
  useEffect(() => {
    (async () => {
      const { count, error } = await BASE_QUERY[specific].count(pId);
      if (error) {
        console.log(error);
      } else {
        setTotal(Math.ceil(count / perPage));
      }
    })();

    filterContRef.current.style.display = "none";
  }, [pId]);

  // Fetches another 5 projects according to the filters every time searchparams changes it's value
  useEffect(() => {
    const currPage = parseInt(searchParams.get("page") || "1", 10);
    const params = Object.fromEntries(searchParams.entries());
    setPage(currPage);
    (async () => {
      if (currPage && (pId || specific === "all")) {
        const start = (currPage - 1) * perPage;
        const end = start - 1 + perPage;
        if (Object.keys(params).length < 2) {
          let query = BASE_QUERY[specific].fetch(pId);
          query = query.range(start, end);
          const { data, count, error } = await query;

          if (error) {
            console.error("Error fetching data:", error);
            setProjectInfo("none");
          } else {
            specific === "saved"
              ? setProjectInfo(data.map((item) => item.Projects))
              : setProjectInfo(data);
            setTotal(Math.ceil(count / perPage));
          }
        } else {
          const result = await queryProjects(supabase, params, start, end, pId);
          console.log(result);
          if (result) {
            if (specific == "saved") {
              setProjectInfo(() => {
                let res = result.projects.map((item) => item["Projects"]);
                res = res.filter((item) => item != null);
                return res;
              });
            } else {
              setProjectInfo(result.projects);
            }
            setTotal(Math.ceil(result.totalCount / perPage));
          }
        }
      }
    })();
  }, [searchParams, pId]);

  return (
    <>
      <div className={styles.search_and_add}>
        <div className={styles.search_container}>
          <input
            type="text"
            className={cn("login__input", styles.searchbar)}
            placeholder="Поиск"
            onChange={(e) => setSearchPattern(e)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.inv_search_button} onClick={applyFilter}>
            {" "}
          </button>
        </div>
        <button className={styles.button_accent}>мои заявки</button>
      </div>
      <div className={styles.filters_cnt}>
        <div className={styles.filter}>
          <h2 onClick={toggleFilter}>Фильтры</h2>
          <img onClick={toggleFilter} src="/assets/dd_arrow.svg" alt="" />
        </div>
        <div>
          <h2 onClick={clearFilters}>Очистить фильтры</h2>
        </div>
      </div>
      <div className={styles.projects__container}>
        {projectInfo == "none" ? (
          <SvgContainer
            width="100%"
            height="100%"
            className="custom-svg-class"
          />
        ) : projectInfo && projectInfo !== "none" ? (
          projectInfo.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              coverImg={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${item.Profile.id}/${item.id}/Project_pic.png`}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className={styles.whitebg}>
        {projectInfo != "none" &&
          projectInfo &&
          (total > 0 ? (
            <Pagination
              page={page || 1}
              count={total}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  onChange={(event, value) => {
                    setSearchParams((previous) => {
                      const params = Object.fromEntries(previous.entries());

                      return {
                        ...params,
                        page: item.page,
                      };
                    });
                  }}
                  to={BASE_QUERY[specific].urlQuery(item)}
                  {...item}
                />
              )}
            />
          ) : (
            <SvgContainer
              width="100%"
              height="100%"
              className="custom-svg-class"
            />
          ))}
      </div>
      <div className="popup_middle_long" ref={filterContRef}>
        <button
          className={styles.close_filter_cont}
          onClick={toggleFilter}
        ></button>
        <h1>СПЕЦИАЛЬНОСТЬ</h1>
        <SearchSelect
          i={"qualification"}
          placeholder={"Выберите специальность"}
          data={qualifications}
          selected={filters}
          setSelected={setFilters}
        />
        <h1>ТИП ПРОЕКТА</h1>
        <SearchSelect
          i={"type"}
          placeholder={"Выберите тип проекта"}
          data={types}
          selected={filters}
          setSelected={setFilters}
        />
        <h1>СТАЖ</h1>
        <SearchSelect
          i={"experience"}
          placeholder={"Выберите стаж"}
          data={experiences}
          selected={filters}
          setSelected={setFilters}
        />
        <h1>ЗАНЯТОСТЬ</h1>
        <SearchSelect
          placeholder={"Выберите занятость"}
          i={"emplType"}
          data={employmentTypes}
          selected={filters}
          setSelected={setFilters}
        />
        <h1>ВРЕМЯ СМЕНЫ</h1>
        <SearchSelect
          placeholder={"Выберите смену"}
          i={"shift"}
          data={shifts}
          selected={filters}
          setSelected={setFilters}
        />
        <h1>ОПЛАТА</h1>
        <SearchSelect
          placeholder={"Выберите оплату"}
          i={"salary"}
          data={salaries}
          selected={filters}
          setSelected={setFilters}
        />
        <button
          className="apply"
          onClick={() => {
            applyFilter();
            toggleFilter();
          }}
        >
          ПРИМЕНИТЬ
        </button>
      </div>
    </>
  );
}
export default ProjectDisplay;
