import React, { useEffect, useState } from "react";
import UserCard from "../../components/allForUserCard/UserCard";
import styles from "./UserDisplay.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { Pagination, PaginationItem } from "@mui/material";
import SvgContainer from "../../components/Svg/SvgContainer";
import Loader from "../../components/loader/Loader";
import cn from "classnames";

const UserDisplay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState([""]);

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [total, setTotal] = useState();
  const [users, setUsers] = useState();
  const perPage = 5;

  const QUERIES = {
    all: () => {
      let query = supabase
        .from("Profile")
        .select(
          `
          id,
          user_id,
          name,
          lastName,
          bio,
          user_qualification(qualifications(name)),
          Education(facility)
        `
        )
        .eq("user_qualification.main", true)
        .or(
          `name.ilike.%${filters[0]}%,name.ilike.%${
            filters[filters.length - 1]
          }%,lastName.ilike.%${filters[0]}%,lastName.ilike.%${
            filters[filters.length - 1]
          }%`
        );
      return query;
    },
    count: () => {
      let query = supabase
        .from("Profile")
        .select("*", { count: "exact", head: true })
        .or(
          `name.ilike.%${filters[0]}%,name.ilike.%${
            filters[filters.length - 1]
          }%,lastName.ilike.%${filters[0]}%,lastName.ilike.%${
            filters[filters.length - 1]
          }%`
        );
      return query;
    },
  };

  async function fetchUsers(start, end) {
    let query = QUERIES.all();
    query = query.range(start, end);
    const { data, error } = await query;
    if (error) {
      console.log(error);
    }
    return { users: data, error };
  }

  async function updateTotalAndFetchData() {
    const { count, error } = await QUERIES.count();
    if (error) {
      console.log(error);
    } else {
      setTotal(Math.ceil(count / perPage));
    }

    const { users, error: fetchError } = await fetchUsers(0, perPage - 1);
    if (fetchError) {
      console.log(fetchError);
      setUsers("none");
    } else {
      setUsers(users.length > 0 ? users : "none");
    }
  }

  function clearFilters() {
    setFilters([""]);
    applyFilter();
  }

  function setSearchPattern(e) {
    setFilters(e.target.value.trim().split(/\s+/));
  }

  function applyFilter() {
    setSearchParams(() => {
      let existingFilters = {};
      const destrFilters = filters[0];
      if (destrFilters.searchPattern) {
        existingFilters.searchPattern = destrFilters.searchPattern;
      }
      filters.map((it, i) => (existingFilters[i] = it));

      return {
        page: "1",
        ...existingFilters,
      };
    });

    updateTotalAndFetchData();
    setPage(1);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      applyFilter();
    }
  }

  useEffect(() => {
    (async () => {
      const currPage = parseInt(searchParams.get("page") || "1", 10);
      setPage(currPage);
      const start = (currPage - 1) * perPage;
      const end = start + perPage - 1;

      if (!total) {
        const { count, error } = await QUERIES.count();
        if (error) {
          console.log(error);
        } else {
          setTotal(Math.ceil(count / perPage));
        }
      }

      const { users, error } = await fetchUsers(start, end);
      if (error) {
        console.log(error);
        setUsers("none");
      } else {
        setUsers(users.length > 0 ? users : "none");
      }
    })();
  }, [searchParams, total]);

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
          <button
            className={styles.inv_search_button}
            onClick={applyFilter}
          ></button>
        </div>
      </div>

      {users === "none" ? (
        <SvgContainer
          width="100%"
          height="100%"
          className="custom-svg-class"
          message="Ничего не найдено"
        />
      ) : users && users !== "none" ? (
        users.map((item) => (
          <UserCard
            key={item.id}
            item={item}
            coverImg={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/profile_photos/${item.user_id}/avatar.png`}
          />
        ))
      ) : (
        <Loader />
      )}

      {total > 0 && (
        <div className={styles.whitebg}>
          <Pagination
            page={page || 1}
            count={total}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                onClick={() => {
                  setSearchParams({ page: item.page });
                }}
                to={(() => {
                  if (filters.length > 1) {
                    return `/users?0=${filters[0]}&1=${filters[1]}&page=${item.page}`;
                  } else if (filters.length > 0 && filters[0]) {
                    return `/users?0=${filters[0]}&page=${item.page}`;
                  } else {
                    return `/users?page=${item.page}`;
                  }
                })()}
                {...item}
              />
            )}
          />
        </div>
      )}
    </>
  );
};

export default UserDisplay;
