import React from 'react'
import styles from './CustomRadio.module.scss'
import cn from 'classnames'

const CustomRadio = ({ click, change, id, name, key, checked, lblValue }) => {
  return (
    <>
      <input onClick={click} type="radio" id={id} name={name} checked={checked} onChange={(e) => change(e)} />
      <label htmlFor={id}>
        <svg className={cn(styles.radio, styles.sign__svg)} viewBox="0 0 40 38" >
          <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
          <path className={styles.check} d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7" />
        </svg>
        <span className={cn(styles.radio__label, styles.signup__label)} >{lblValue}</span>
      </label>
    </>
  )
}

export default CustomRadio