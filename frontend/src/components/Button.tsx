import React from "react";
import styles from '../styles/styles.module.css'
import Image from "next/image";
import Add from "../../public/plus.svg"
import { useRouter } from 'next/navigation';
import { Loading } from ".";

const Button = ({...props}) => {
    const router = useRouter();

    return (
        <div className={styles.buttonBody} onClick={() => props.action()}>
            <div className={styles.button} style={{
                minWidth: props.loading && '75px'
            }}>
                {
                    props.add && (
                        <Image src={Add} alt={"Adicionar"} className={styles.iconAdd}/>
                    )
                }
                {
                    props.loading ? (
                        <Loading 
                            button={true}
                        />
                    ) : (
                        <p>{props.button}</p>
                    )
                }
            </div>
        </div>
    )
}

export default Button;