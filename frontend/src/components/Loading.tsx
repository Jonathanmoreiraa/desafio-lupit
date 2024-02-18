import React from "react";
import styles from '../styles/styles.module.css'

const Loading = ({...props}) => {
    return (
        <div className={styles.loaderBody}>
            {
                props.button ? (
                    <div className={styles.loaderButton}></div>
                ) : (
                    <div className={styles.loader}></div>
                )
            }
        </div>
    )
}

export default Loading;