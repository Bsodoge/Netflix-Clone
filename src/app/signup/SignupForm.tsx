'use client'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"
import app from "../firebase/firebase";
import styles from "./SignupForm.module.css"


export default function SigninForm(){
    const auth = getAuth(app);
    const route = useRouter();
    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [againPassword, setAgainPassword] = useState<string>('');
    const handleLogin = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password);
            route.push('/');
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className={styles.signin_form}>
            <h1>Sign Up</h1>
            <form action="" className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.input_container}>
                    <label htmlFor="email">Enter email address</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="password">Enter password</label>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="password">Enter password again</label>
                    <input type="password"  onChange={(e) => setAgainPassword(e.target.value)}/>
                </div>
                <button disabled={!email || !password || !againPassword || againPassword !== password} className={styles.button} onClick={() => handleLogin()}>Sign In</button>
            </form>
        </div>
    )
}