import React, { useEffect, useState } from "react";
import styles from "./UserDisplay.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { Pagination, PaginationItem } from "@mui/material";

const UserDisplay = () => {
  const QUERIES = {
    all: () => {
      return supabase.from("Profile").select(
        `
    name,
    lastName,
    bio,
    user_qualification(qualifications(name))
    Education(facility)
  `
      ); // Request the exact count of matching rows
    },
    count: () => {
      return supabase
        .from("Profile")
        .select("*", { count: "exact", head: true });
    },
  };
  const perPage = 5;

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [total, setTotal] = useState();
  const [users, setUsers] = useState("");

  async function fetchUsers(start, end) {
    // Start the query with the required project fields and project_qualifications
    let query = QUERIES.all();
    query = query.range(start, end);
    const { data, error } = await query;
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    return {
      users: data,
      error: error,
    };
  }

  useEffect(() => {
    (async () => {
      if (!total) {
        const { count, error } = await QUERIES.count();
        if (error) {
          console.log(error);
        } else {
          setTotal(Math.ceil(count / perPage));
        }
      } else {
        const currPage = parseInt(searchParams.get("page") || "1", 10);
        setPage(currPage);
        const start = (currPage - 1) * perPage;
        const end = start - 1 + perPage;
        const { users, error } = await fetchUsers(start, end);
        setUsers(users);
      }
    })();
  }, [searchParams, total]);
  // useEffect(() => {
  //   const currPage = parseInt(searchParams.get("page") || "1", 10);
  //   const params = Object.fromEntries(searchParams.entries());
  //   setPage(currPage);
  //   (async () => {
  //     if (currPage && (uId || specific === "all")) {
  //       const start = (currPage - 1) * perPage;
  //       const end = start - 1 + perPage;
  //       if (Object.keys(params).length < 2) {
  //         let query = BASE_QUERY[specific].fetch(uId);
  //         query = query.range(start, end);
  //         const { data, count, error } = await query;

  //         if (error) {
  //           console.error("Error fetching data:", error);
  //         } else {
  //           specific === "saved"
  //             ? setProjectInfo(data.map((item) => item.Projects))
  //             : setProjectInfo(data);
  //           setTotal(Math.ceil(count / perPage));
  //         }
  //       } else {
  //         const result = await queryProjects(supabase, params, start, end, uId);
  //         console.log(result);
  //         if (result) {
  //           if (specific == "saved") {
  //             setProjectInfo(() => {
  //               let res = result.projects.map((item) => item["Projects"]);
  //               res = res.filter((item) => item != null);
  //               return res;
  //             });
  //           } else {
  //             setProjectInfo(result.projects);
  //           }
  //           setTotal(Math.ceil(result.totalCount / perPage));
  //         }
  //       }
  //     }
  //   })();
  // }, [total, searchParams, uId]);

  return (
    <div>
      {users &&
        users.map((u, i) =>
          u.name == null ? (
            <div key={i}>{"noname"}</div>
          ) : (
            <div key={i}>{u.name}</div>
          )
        )}
      {total && (
        <div className={styles.whitebg}>
          <Pagination
            page={page || 1}
            count={total}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                onChange={() => {
                  setSearchParams(() => {
                    return {
                      page: item.page,
                    };
                  });
                }}
                to={`/users?page=${item.page}`}
                {...item}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
