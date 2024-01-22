import React from 'react'
import styles from './style.module.scss'

const Loader = () => {
  return (
    <div className={styles.wrapperLoader}>
        <span className={styles.loader}></span>
    </div>
  )
}

export default Loader