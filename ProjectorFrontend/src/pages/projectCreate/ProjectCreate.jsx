import styles from './ProjectCreate.module.scss'

export default function ProjectCreate(){
return (<>
  <div className={styles.project_detail_column}>
    <h1 className={styles.project_add_title}>Добавьте ваш проект</h1>

    <div className={styles.flex_row_input_container}>
      <div className={styles.project_name_column}>
        <h1 className={styles.project_name_label}>НАЗВАНИЕ*</h1>

        <div
          className={styles.project_name_input_box}
          style={{ '--src': `url(${'/assets/f8e3260819898976fb0d5c8133e56928.svg'})` }}>
          <h2 className={styles.project_name_hint}>Введите...</h2>
        </div>

        <h1 className={styles.project_description_label}>ОПИСАНИЕ*</h1>

        <div
          className={styles.project_description_input_box}
          style={{ '--src': `url(${'/assets/f8e3260819898976fb0d5c8133e56928.svg'})` }}>
          <h2 className={styles.project_description_hint}>Введите...</h2>
        </div>
      </div>

      <div className={styles.image_display_column}>
        <div className={styles.project_image_comment}>
          <img
            className={styles.project_image}
            src={'/assets/77006753426b76f21dd172823dc531bc.svg'}
            alt="alt text"
          />
        </div>
      </div>
    </div>
  </div>

  <div className={styles.project_type_column}>
    <h1 className={styles.project_type_label}>ТИП ПРОЕКТА*</h1>

    <div className={styles.project_type_buttons_row1}>
      <button className={styles.full_length_button}>
        {/* TODO */}
        полный метр
      </button>
      <button className={styles.short_length_button}>
        {/* TODO */}
        короткий метр
      </button>
      <button className={styles.music_video_button}>
        {/* TODO */}
        музыкальный клип
      </button>
      <button className={styles.commercial_button}>
        {/* TODO */}
        рекламный ролик
      </button>
    </div>

      <div className={styles.project_type_buttons_row2}>
        <button className={styles.tiktok_button}>
          {/* TODO */}
          tiktok
        </button>
        <button className={styles.vlog_button}>
          {/* TODO */}
          влог
        </button>
        <button className={styles.behind_the_scenes_button}>
          {/* TODO */}
          бэкстейдж
        </button>
        <button className={styles.show_button}>
          {/* TODO */}
          шоу
        </button>
      </div>

      <div className={styles.project_type_buttons_row3}>
        <button className={styles.report_button}>
          {/* TODO */}
          репортаж
        </button>
        <button className={styles.other_button}>
          {/* TODO */}
          другое
        </button>
      </div>
    </div>
    </>)
}