import styles from "./SignUp.module.css"
import Link from "next/link"
export default function SignUp(){
    return(
        <div className={styles.signup_container}>
          <p>Ready to watch? Press the sign up button to create an account</p>
          <Link href="/signin"><button>Sign up</button></Link>
        </div>
    )
}