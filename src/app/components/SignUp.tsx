import styles from "./SignUp.module.css"
export default function SignUp(){
    return(
        <div className={styles.signup_container}>
          <p>Ready to watch? Press the sign up button to create an account</p>
          <button>Sign up</button>
        </div>
    )
}