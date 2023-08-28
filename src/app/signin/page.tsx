import Betterflix from "../assets/Betterflix.svg"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"
import SigninForm from "./SigninForm"
export default function Signin(){
    return(
        <main>
            <header className={styles.header}>
                <Link href={""}><Image src={Betterflix} alt="Netflix Logo" width={150} height={50}></Image></Link>
            </header>
            <SigninForm />
        </main>
    )
}