import React, { useEffect, useState, useRef } from 'react';
import {
  qualifications,
  experiences,
  types,
  employmentTypes,
  shifts,
  salaries
} from '../../utilityFunctions/utilityObjects';
import cn from 'classnames';
import supabase from '../../config/supabaseClient';

import styles from './ProjectDisplay.module.scss';
import { useSearchParams, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import FilterInput from '../../components/filterInput/FilterInput';
import { toggleButtonGroupClasses } from '@mui/material';

function ProjectDisplay() {

  const [projectInfo, setProjectInfo] = useState();
  const [filters, setFilters] = useState({
    qualification: qualifications[1],
    type: types[1],
    experience: experiences[1],
    emplType: employmentTypes[1],
    shift: shifts[1],
    salary: salaries[1],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [total, setTotal] = useState();
  const perPage = 5;

  const filterContRef = useRef()

  async function queryProjects(supabase, filters, start, end) {
    // Start the query with the required project fields and project_qualifications
    let query = supabase
      .from('Projects')
      .select(`
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
      `, { count: 'exact' })  // Request the exact count of matching rows
      .order('promotion', { ascending: true })  // Sorting by promotion
      .range(start, end);  // Pagination using start and end

    // Apply filters on Projects if they are present
    if (filters.type) {
      query = query.eq('type', filters.type);  // Filter by project type
    }

    // Apply filters on project_qualifications fields
    if (filters.qualification) {
      query = query.eq('project_qualifications.qualification_id.name', filters.qualification);  // Filter by qualification name
    }
    if (filters.experience) {
      query = query.eq('project_qualifications.experience', filters.experience);  // Filter by experience
    }
    if (filters.emplType) {
      query = query.eq('project_qualifications.employment', filters.emplType);  // Filter by employment type
    }
    if (filters.shift) {
      query = query.eq('project_qualifications.shift', filters.shift);  // Filter by shift
    }
    if (filters.salary) {
      query = query.eq('project_qualifications.salary', filters.salary);  // Filter by salary
    }

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return null;
    }

    return {
      projects: data,  // The filtered projects
      totalCount: count  // Total count of projects that match the filters
    };
  }


  function goToDetailedView(e) { console.log(e.currentTarget.getAttribute('pr_id')) }

  useEffect(() => {
    (async () => {
      const { count, error } = await supabase
        .from('Projects')
        .select('*', { count: 'exact', head: true });
      if (error) { console.log(error) }
      else {
        setTotal(Math.ceil(count / perPage))
      }
    })()

    filterContRef.current.style.display = 'none'
  }, [])

  useEffect(() => {
    const currPage = parseInt(searchParams.get('page') || '1', 10)
    const params = Object.fromEntries(searchParams.entries());
    setPage(currPage);
    (async () => {
      if (currPage) {
        const start = (currPage - 1) * perPage
        const end = start - 1 + perPage
        if (Object.keys(params).length < 2) {
          const { data, error } = await supabase
            .from('Projects')
            .select(`
            id,
            name,
            description,
            created_at,
            Profile ( id, name, lastName ),
            project_qualifications( qualification_id(name), experience, employment, shift, salary)
          `)
            .order('promotion', { ascending: true })
            .range(start, end);


          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProjectInfo(data);
            console.log(data);
          }
        } else {
          console.log(params)
          const result = await queryProjects(supabase, params, start, end);
          console.log("Projects:", result.projects);
          console.log("Total Count:", result.totalCount);
          setProjectInfo(result.projects);
          setTotal(Math.ceil(result.totalCount / perPage));
        }
      }
    })()
  }
    , [searchParams])

  function defaultImage(e) {
    e.target.src = '/assets/hlopushka.svg';
  }

  function applyFilter() {
    setSearchParams((previous) => {
      let existingFilters = {};

      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          existingFilters[key] = value['name'];
        };
      }

      return {
        page: '1',
        ...existingFilters
      }
    });
    setPage(1);
  }

  function objectToQueryString(filters, page) {
    const queryString = Object.keys(filters)
      .filter(key => filters[key] !== null && filters[key] !== undefined && key != 'page')  // Filter out null/undefined fields
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`) // Encode key and value
      .join('&');  // Join them with '&'

    if (queryString) {
      if (page == 1) {
        return `?${queryString}`
      } else {
        return `&${queryString}`
      }
    } else {
      return ''
    };  // Return the query string
  }

  const toggleFilter = () => {
    (filterContRef.current.style.display == 'none') ?
      filterContRef.current.style.display = 'flex' :
      filterContRef.current.style.display = 'none'
  }
  return (

    <>
      <div className={styles.search_and_add}>
        <div className={styles.search_container}>
          <input type="text" className={cn('login__input', styles.searchbar)} placeholder='Поиск' />
          <button className={styles.inv_search_button}> </button>
        </div>
        <button className={styles.button_accent}>мои заявки</button>
      </div>
      <div className={styles.filter} onClick={toggleFilter}>
        <h2>Фильтры</h2>
        <img src="/assets/dd_arrow.svg" alt="" />
      </div>
      {projectInfo && projectInfo.map((item) =>
        <div className={styles.project_card} key={item.id} pr_id={item.id} onClick={(e) => goToDetailedView(e)}>
          <div className={styles.img_frame}>
            <img src={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${item.Profile.id}/${item.id}/Project_pic.png`} alt="hlopushka" onError={(e) => (defaultImage(e))} />
          </div>
          <div className={styles.project_text} >
            <h1 className={styles.title4}>{item.name}</h1>
            <h2 className={styles.medium_title3}>{item.Profile.name} {item.Profile.lastName}</h2>
            <div className={styles.desc_cont}>
              <h3 className={styles.subtitle}>
                {item.description}
              </h3>
            </div>
          </div>
        </div>
      )}
      <div className={styles.whitebg}>
        {total && <Pagination
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
                    page: item.page
                  }
                });
              }}
              to={`/create${item.page === 1 ? '' : `?page=${item.page}`}${objectToQueryString(Object.fromEntries(searchParams.entries()), item.page)}`}
              {...item}
            />
          )}
        />}
      </div>
      <div className={styles.filter_cont} ref={filterContRef}>
        <button className={styles.close_filter_cont} onClick={toggleFilter}></button>
        <h1>СПЕЦИАЛЬНОСТЬ</h1>
        <FilterInput i={'qualification'} data={qualifications} selected={filters} setSelected={setFilters} />
        <h1>ТИП ПРОЕКТА</h1>
        <FilterInput i={'type'} data={types} selected={filters} setSelected={setFilters} />
        <h1>СТАЖ</h1>
        <FilterInput i={'experience'} data={experiences} selected={filters} setSelected={setFilters} />
        <h1>ЗАНЯТОСТЬ</h1>
        <FilterInput i={'emplType'} data={employmentTypes} selected={filters} setSelected={setFilters} />
        <h1>ВРЕМЯ СМЕНЫ</h1>
        <FilterInput i={'shift'} data={shifts} selected={filters} setSelected={setFilters} />
        <h1>ОПЛАТА</h1>
        <FilterInput i={'salary'} data={salaries} selected={filters} setSelected={setFilters} />
        <button className={styles.apply} onClick={applyFilter}>ПРИМЕНИТЬ</button>
      </div>
    </>
  );
}


export default ProjectDisplay;
