'use client'

import { useEffect, useState } from "react"
import styles from "./page.module.css"
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase";
import ListItem from "../components/ListItem";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function MyList() {
    const route = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            route.push('/signin');
        },
    });
    let [userID, setUserID] = useState<string>('');
    let [movieList, setMovieList] = useState<Array<string>>([]);
    const auth = getAuth(app);
    const db = getDatabase(app);
    onAuthStateChanged(auth, user => {
        if (user) {
            setUserID(user.uid)
            console.log(userID.length !< 0)
        };
    });

    useEffect(() => {
        if(userID.length > 1){
            const reference = ref(db, `users/${userID}/`);
            onValue(reference, snapshot => {
                setMovieList([]);
                console.log(movieList)
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    console.log(childData);
                    setMovieList(prevList => [...prevList, childData.movie]);
                });
            }, {
                onlyOnce: true
            });
        }
    }, [userID])
    return (
        <main className={styles.main}>
            <h1>My List</h1>
            <div className={styles.movie_container}>
                {
                    movieList.map((movieID, id) => <ListItem key={id} id={movieID}/>)
                }
            </div>
        </main>
    )
}