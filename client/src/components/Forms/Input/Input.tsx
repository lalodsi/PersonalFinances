import { InputHTMLAttributes } from "react"
import styles from "./Input.module.css"

const InputStyled = (props: InputHTMLAttributes<HTMLInputElement>) => {


    return <input className={styles.container} {...props} />
}

export default InputStyled