import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import supabase from '../../config/supabaseClient';

import styles from './ProjectDisplay.module.scss';
import Popover_fiter from '../../components/popover/Popover';

function ProjectDisplay(props) {
  const [projectInfo, setProjectInfo] = useState();

  useEffect(()=>
    { (async () => {const { data, error } = await supabase
  .from('Projects')
  .select(`
    id,
    name,
    description,
    created_at,
    Profile ( id, name, lastName )
  `);

  
  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Fetched projects with qualifications:', data);
    setProjectInfo(data);
  }})()
  
}, [])

function defaultImage (e) {
  e.target.src='/assets/hlopushka.svg';
}

  return (

            <>
              <div className={styles.search_and_add}>
                <div className={styles.search_container}>
                  <input type="text" className={cn('login__input', styles.searchbar)} placeholder='Поиск'/>
                  <button className={styles.inv_search_button}> </button>
                </div>
                <button className={styles.button_accent}>holy moly</button>
              </div>
              <Popover_fiter/>
              {projectInfo && projectInfo.map((item) =>
                <>
                <div className={styles.project_card} >
                <div className={styles.img_frame}>
                  <img src={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${item.Profile.id}/${item.id}/Project_pic.png`} alt="hlopushka" onError={(e)=>(defaultImage(e))}/>
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
                </>
              )}
            </>
  );
}

ProjectDisplay.propTypes = {
  className: PropTypes.string
};

export default ProjectDisplay;
