"use client"
import { useState } from "react"
import styles from "./QuestionAnswer.module.css"

interface props{
    question : string,
    answer : string
}

export default function QuestionAnswer({question, answer} : props) {
    let [hidden, setHidden] = useState<Boolean>(true)
    const toggleHidden = () : void => {
        setHidden(prevHidden => !prevHidden);
        console.log(hidden)
    }
    return(
        <li className={styles.QA_container}>
            <div className={`${styles.question_container} ${!hidden ? styles.clicked : ""}`} onClick={toggleHidden}>
                <h3>{question}</h3>
            </div>
            <div className={hidden ? styles.hidden : styles.answer_container}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, excepturi.</p>
            </div>
        </li>
    )
}