import styles from "./Card.module.css"
import Link from "next/link"

export default function Card() {
    return (
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div className={styles.text_container}>
                    <h2>The Betterflix you love for just £4.20.</h2>
                    <p>Get the standard with advert plans.</p>
                    <Link href={""} className={styles.card_link}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}