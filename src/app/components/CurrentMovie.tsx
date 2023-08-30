'use client'

import styles from "./CurrentMovie.module.css"
import { IMovieDetails } from "../interfaces/IMovieDetails"
import { useEffect, useRef } from "react"

interface props {
    currentMovie : IMovieDetails
}

export default function CurrentMovie({currentMovie} : props){
    const currentMovieContainer = useRef<HTMLDivElement>(null);
    const changeBackgroundImage = () : void => {
        currentMovieContainer.current!.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path})`
    }
    useEffect(changeBackgroundImage,[currentMovie]);
    return(
        <div className={styles.current_movie_container} ref={currentMovieContainer}>
            <div className={styles.text_container}>
                <h2>{currentMovie?.title}</h2>
                <p>{currentMovie?.overview}</p>
            </div>
        </div>
    )
}