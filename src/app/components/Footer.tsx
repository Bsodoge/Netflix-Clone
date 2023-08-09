import Link from "next/link"
import Image from "next/image"
import styles from "./Footer.module.css"
export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div>
                <h2>Quick Links</h2>
                <div className={styles.link_container}>
                    <Link href="">Home</Link>
                    <Link href="">Profile</Link>
                    <Link href="">For You</Link>
                </div>
            </div>
            <div>
                <h2>Socials</h2>
                <div className={styles.link_container}>
                    <Link href="">X</Link>
                    <Link href="">Facebook</Link>
                    <Link href="">Instagram</Link>
                    <Link href="">Github</Link>
                </div>
            </div>
            <p className={styles.copyright}>Betterflix &copy;2023</p>
        </footer>
    )
}