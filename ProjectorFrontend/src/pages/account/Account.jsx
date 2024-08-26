import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState } from 'react';

import styles from './Account.module.scss'
import ProjectCreate from '../projectCreate/ProjectCreate';
import ProjectDisplay from '../projectDisplay/ProjectDisplay';

export default function Account(props) {
  const [section, setSection] = useState('list')

  return (
    <section className={cn(styles.profile_section, props.className, 'project-creation')}>

          <div className={styles.flex_row_container}>
            <Sidebar/>
            <div className={styles.flex_column_container}>
              {(section=='create') && <ProjectCreate/>}
              {(section=='list') && <ProjectDisplay/>}
            </div>
          </div>
    </section>
  );
}

Account.propTypes = {
  className: PropTypes.string
};