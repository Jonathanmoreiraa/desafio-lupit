'use client'

import React, { ChangeEventHandler, useEffect, useState } from "react";
import styles from '../styles/styles.module.css'

function Select({ ...props}) {
    const [value, setValue] = useState("");

    const changeValue = (e: string) => {
        props.onChange(e)
    }

    return (
        <>
            <label 
                className={props.value !== "" ? styles.inputLabel : styles.inputLabelEmpty} 
                htmlFor={props.id}
            >
                {props.label}
                {
                    props.required && (
                        <p className={styles.required}>*</p>
                    )
                }
            </label>
            <div className={styles.inputContainer}>
                <select 
                    id={props.id}
                    value={props.value} 
                    onChange={(e) => changeValue(e.target.value)}
                    className={styles.selectField}
                >
                {
                    props.options.map((option: { id: string ; label: string}) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option> 
                    ))
                }
                </select>
            </div>
        </>
    );
  }

export default Select;