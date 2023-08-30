"use client"

import styles from "./Carousel.module.css"
import { ReactElement, useEffect, useRef, useState } from "react"
import CarouselMovie from "./CarouselMovie";
import { IMovieDetails } from "../interfaces/IMovieDetails";

interface props {
    type: string,
    setCurrentMovie: Function
}

export default function Carousel({ type, setCurrentMovie }: props) {
    const [loading, setLoading] = useState<boolean>(true);
    const slider = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    let [movies, setMovies] = useState<Array<IMovieDetails>>([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                const results = response.results.splice(0,10);
                setMovies(results);
                setCurrentMovie(results[0]);
            })
            .catch(err => console.error(err));
        setLoading(loading => !loading);
    }, [])
    const generateProgressBars = (): ReactElement[] => {
        const sliderIndex = Number(getComputedStyle(slider.current!).getPropertyValue('--slider-index'));
        const itemsPerScreen = Number(getComputedStyle(slider.current!).getPropertyValue('--items-per-screen'));
        const progressBarItemCount = Math.ceil(slider.current!.children.length / itemsPerScreen);
        const progressBars: ReactElement[] = [];
        for (let i = 0; i < progressBarItemCount; i++) {
            if (i === sliderIndex) {
                progressBars.push(<div className={`${styles.progress_item} ${styles.active}`} key={i}></div>);
            } else {
                progressBars.push(<div className={styles.progress_item} key={i}></div>);
            }
        }
        return progressBars;
    }
    const handleMove = (type: string): void => {
        const itemsPerScreen = Number(getComputedStyle(slider.current!).getPropertyValue('--items-per-screen'));
        const progressBarItemCount = Math.ceil(slider.current!.children.length / itemsPerScreen);
        const sliderIndex = Number(getComputedStyle(slider.current!).getPropertyValue('--slider-index'));
        if (type === 'right') {
            if (sliderIndex + 1 >= progressBarItemCount) {
                slider.current!.style.setProperty("--slider-index", String(0));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[0].classList.add(`${styles.active}`);
            } else {
                slider.current!.style.setProperty("--slider-index", String(sliderIndex + 1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[sliderIndex + 1].classList.add(`${styles.active}`);
            }
        }
        else if (type === 'left') {
            if (sliderIndex - 1 < 0) {
                slider.current!.style.setProperty("--slider-index", String(progressBarItemCount - 1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[progressBarItemCount - 1].classList.add(`${styles.active}`);
            } else {
                slider.current!.style.setProperty("--slider-index", String(sliderIndex - 1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[sliderIndex - 1].classList.add(`${styles.active}`);
            }
        }
    }
    return (
        <div className={styles.carousel_container}>
            <div className={styles.header}>
                <h3 className={styles.title}>What's {type.replace('_', ' ')}</h3>
                <div className={styles.progress_bar} ref={progressBar}>
                    {
                        loading ? <></> : generateProgressBars().map(bar => bar)
                    }
                </div>
            </div>
            <div className={styles.carousel}>
                <button className={`${styles.handle} ${styles.left}`} onClick={() => handleMove('left')}>
                    <div className={styles.text}>
                        &#8249;
                    </div>
                </button>
                <div className={styles.slider} ref={slider}>
                    {
                        loading ? <></> : movies.map(movie => <CarouselMovie movieDetails={movie} setCurrentMovie={setCurrentMovie}/>)
                    }
                </div>
                <button className={`${styles.handle} ${styles.right}`} onClick={() => handleMove('right')}>
                    <div className={styles.text}>
                        &#8250;
                    </div>
                </button>
            </div>
        </div>
    )
}