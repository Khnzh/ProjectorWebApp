import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import styles from "./Popover.module.scss"
import cn from 'classnames'

export default function Popover_fiter() {
  return ( <div className={styles.popover}>
    <Popover className="relative">
      <PopoverButton className={styles.text_borders}>
        <div className={styles.filter}>
          <h2>Фильтры</h2>
          <img src="/assets/dd_arrow.svg" alt="" />
        </div></PopoverButton>
      <PopoverPanel anchor="bottom start" className={cn('flex', 'flex-col', styles.custom)}>
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
      </PopoverPanel>
    </Popover>
  </div>
  )
}