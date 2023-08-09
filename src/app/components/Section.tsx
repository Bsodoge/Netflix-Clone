import styles from "./Section.module.css"
interface props{
    headingText: string,
    paragraphText: string
}

export default function Section({headingText, paragraphText} : props){
    return(
        <div className={styles.section}>
            <h1>{headingText}</h1>
            <p>{paragraphText}</p>
        </div>
    )
}