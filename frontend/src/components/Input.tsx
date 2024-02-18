'use client'
import React, { ChangeEventHandler, useEffect, useState } from "react";
import styles from '../styles/styles.module.css'

const Input = ({...props}) => {
    const [value, setValue] = useState("");

    useEffect(()=>{
        if (props.valueSelected !== undefined) {
            changeValue(props.valueSelected);
        }
    },[props.valueSelected])

    const changeValue = (e: string) => {
        if (props.type) {
            if ((props.type === "number" && !isNaN(Number(e))) || props.type !== "number") {
                setValue(e);
                props.value(e);
            }
        }else{
            setValue(e);
            props.value(e);
        }
    }

    return (
        <div>
            <label 
                className={value !== "" && value !== null ? styles.inputLabel : styles.inputLabelEmpty} 
                htmlFor={props.id}
            >
                {props.label}
                {
                    props.required && (
                        <p className={styles.required}>*</p>
                    )
                }
            </label>
            <span className={styles.inputContainer}>
                <input 
                    id={props.id}
                    className={styles.inputField}
                    value={value}
                    onChange={(e) => changeValue(e.target.value)} 
                    required={props.required}
                    type={props.type}
                    step={props.step}
                    style={{
                        width: props.linha ? "100%" : '280px'
                    }}
                />
            </span>
        </div>
    )
}

export default Input;