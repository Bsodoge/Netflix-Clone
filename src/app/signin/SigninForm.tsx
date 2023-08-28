'use client'
import { signIn } from "next-auth/react";
import { useState } from "react"
import styles from "./SigninForm.module.css"


export default function SigninForm(){
    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    const handleLogin = () => {
        signIn('credentials', {email, password, redirect: true, callbackUrl: '/'});
    }
    return(
        <div className={styles.signin_form}>
            <h1>Sign In</h1>
            <form action="" className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.input_container}>
                    <label htmlFor="email">Enter email address</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="password">Enter password</label>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button disabled={!email || !password} className={styles.button} onClick={() => handleLogin()}>Sign In</button>
            </form>
        </div>
    )
}