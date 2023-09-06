'use client'

import app from "@/app/firebase/firebase";
import { ISpecificMovieDetails } from "@/app/interfaces/ISpecificMovieDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface props {
    params: { id: number }
}

export default function IdPage({ params }: props) {
    const route = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            route.push('/signin');
        },
    });
    let [movie, setMovie] = useState<ISpecificMovieDetails>();
    let [userID, setUserID] = useState<string>('');
    let [favourite, setFavourite] = useState<boolean>(false);
    let [databaseKey, setDatabaseKey] = useState<string>('');
    const movieBackground = useRef<HTMLDivElement>(null);
    const auth = getAuth(app);
    const db = getDatabase(app);
    onAuthStateChanged(auth, user => {
        if (user) {
            setUserID(user.uid)
        };
    });
    const checkFavourite = (): boolean => {
        const reference = ref(db, `users/${userID}/`);
        onValue(reference, snapshot => {
            let found = false;
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.movie === params.id) {
                    setDatabaseKey(childSnapshot.key);
                    found = true
                };
            });
            found ? setFavourite(true) : setFavourite(false);
        }, {
            onlyOnce: true
        });
        return favourite;
    }
    const addFavourite = (): void => {
        const reference = ref(db, `users/${userID}/`);
        const newReference = push(reference);
        if (!favourite) {
            set(newReference, {
                movie: params.id
            })
        } else {
            deleteFavourite();
        }
        checkFavourite();
    }
    const deleteFavourite = (): void => {
        console.log(databaseKey)
        const reference = ref(db, `users/${userID}/${databaseKey}/`);
        remove(reference);
    }
    const calculateTime = (minutes: number): string => {
        const hours = Math.trunc(minutes / 60);
        const newMinutes = minutes % 60;
        return `${hours}h ${newMinutes}m`
    }
    const changeBackgroundImage = (backdrop_path: string): void => {
        movieBackground.current!.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
    }
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
                changeBackgroundImage(response.backdrop_path);
            })
            .catch(err => console.error(err));
    }, [])
    return (
        <main className={styles.main}>
            <div className={styles.background_image} ref={movieBackground}>
                <img src={movie ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : ''} alt={movie ? movie.title : 'Movie Poster'} className={styles.movie_poster} />
            </div>
            <h2 className={styles.movie_title}>{movie?.title} <span className={styles.date}>({movie?.release_date.slice(0, 4)})</span></h2>
            <div className={styles.rating_play}>
                <div className={`${styles.circle} ${movie!?.vote_average * 10 > 69 ? styles.good : movie!?.vote_average * 10 > 50 ? styles.medium : styles.bad}`}>
                    <div className={styles.rating}>{Math.floor(movie!?.vote_average * 10)}%</div>
                </div>
                <div className={styles.line}></div>
                <button className={styles.play} onClick={() => addFavourite()}>{checkFavourite() ? `Unfavourite` : `Favourite`}</button>
            </div>
            <div className={styles.movie_details}>
                {new Date(movie!?.release_date).toLocaleString().slice(0,10)} &#x2022; {calculateTime(movie!?.runtime)}
                <div>{movie!?.genres.map((genere, i, genres) => `${genere.name}${i + 1 !== genres.length ? ', ' : ''}`)}</div>
            </div>
            <div className={styles.movie_tagline}><em>{movie!?.tagline}</em></div>
            <div className={styles.movie_overview}>
                <h2>Overview</h2>
                <p>{movie!?.overview}</p>
            </div>
        </main>
    )
}