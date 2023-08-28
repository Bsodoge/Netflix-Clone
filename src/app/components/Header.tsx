'use client'
import Betterflix from "../assets/Betterflix.svg"
import Image from "next/image"
import Link from "next/link"
import styles from "./Header.module.css"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Header() {
    const { data: session } = useSession();
    const handleLogout = () => {
        try {
            signOut();
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <header className={styles.header}>
            <Link href={""}><Image src={Betterflix} alt="Netflix Logo" width={150} height={50}></Image></Link>
            {
                session ? <button className={styles.button} onClick={() => handleLogout()}>Log out</button> :
                <Link href={"/signin"}><button className={styles.button}>Sign in</button></Link>
            }
        </header>
    )
}