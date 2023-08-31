'use client'

import { useEffect, useState } from "react"
import styles from "./page.module.css"
import { child, getDatabase, onValue, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase";
import ListItem from "../components/ListItem";


export default function MyList() {
    let [userID, setUserID] = useState<string>('');
    let [movieList, setMovieList] = useState<Array<string>>([]);

    const auth = getAuth(app);
    const db = getDatabase(app);
    onAuthStateChanged(auth, user => {
        if (user) {
            setUserID(user.uid)
        };
    });
    useEffect(() => {
        const reference = ref(db, `users/${userID}/`);
        onValue(reference, snapshot => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                setMovieList(prevList => [...prevList, childData.movie]);
            });
        }, {
            onlyOnce: true
        });
    }, [])
    return (
        <main className={styles.main}>
            <h1>My List</h1>
            <div className={styles.movie_container}>
                {
                    movieList.map(movieID => <ListItem id={movieID}/>)
                }
            </div>
        </main>
    )
}