import Betterflix from "../assets/Betterflix.svg"
import Image from "next/image"
import Link from "next/link"
import styles from "./Header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
            <Link href={""}><Image src={Betterflix} alt="Netflix Logo" width={150} height={50}></Image></Link>
            <Link href={""}><button className={styles.button}>Sign in</button></Link>
        </header>
    )
}