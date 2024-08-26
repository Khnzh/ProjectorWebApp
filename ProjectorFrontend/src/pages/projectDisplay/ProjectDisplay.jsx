import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ProjectDisplay.module.scss';

function ProjectDisplay(props) {
  return (

            <>
              <div className={styles.project_card} >
                <div className={styles.img_frame}>
                <img src="/assets/hlopushka.svg" alt="hlopushka" />
                </div>
                <div className={styles.project_text} >
                  <h1 className={styles.title4}>ЦЕХОВЫЙ МАЛЬЧИШКА</h1>
                  <h2 className={styles.medium_title3}>Володя Александров</h2>
                  <h3 className={styles.subtitle}>
                    Геня Жульшенков попадает по распределению на работу в цех, в котором царит безвластие и
                    неорганизованность
                  </h3>
                  </div>
              </div>
            </>
  );
}

ProjectDisplay.propTypes = {
  className: PropTypes.string
};

export default ProjectDisplay;
