"use client"

import styles from "./Carousel.module.css"
import { ReactElement, useEffect, useRef, useState } from "react"


export default function Carousel(){
    const [loading, setLoading] = useState<boolean>(true);
    const slider = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setLoading(loading => !loading);
    }, [])
    const generateProgressBars = () : ReactElement[] => {
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
    const handleMove = (type : string) : void => {
        const itemsPerScreen = Number(getComputedStyle(slider.current!).getPropertyValue('--items-per-screen'));
        const progressBarItemCount = Math.ceil(slider.current!.children.length / itemsPerScreen);
        const sliderIndex = Number(getComputedStyle(slider.current!).getPropertyValue('--slider-index'));
        if (type === 'right') {
            if(sliderIndex + 1 >= progressBarItemCount){
                slider.current!.style.setProperty("--slider-index", String(0));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[0].classList.add(`${styles.active}`);
            } else {
                console.log(sliderIndex)
                slider.current!.style.setProperty("--slider-index", String(sliderIndex + 1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[sliderIndex +1].classList.add(`${styles.active}`);
            }
        }
        else if(type === 'left'){
            if(sliderIndex - 1 < 0){
                slider.current!.style.setProperty("--slider-index", String(progressBarItemCount -1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[progressBarItemCount - 1].classList.add(`${styles.active}`);
            } else {
                slider.current!.style.setProperty("--slider-index", String(sliderIndex - 1));
                progressBar.current!.children[sliderIndex].classList.remove(`${styles.active}`);
                progressBar.current!.children[sliderIndex -1].classList.add(`${styles.active}`);
            }
        }
    }
    return(
        <div className={styles.carousel_container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Popular</h3>
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
                    <img src="https://via.placeholder.com/210/00FF00?text=1" />
                    <img src="https://via.placeholder.com/220/00FF00?text=2" />
                    <img src="https://via.placeholder.com/230/00FF00?text=3" />
                    <img src="https://via.placeholder.com/240/00FF00?text=4" />
                    <img src="https://via.placeholder.com/250/00FF00?text=5" />
                    <img src="https://via.placeholder.com/260/00FF00?text=6" />
                    <img src="https://via.placeholder.com/270/00FF00?text=7" />
                    <img src="https://via.placeholder.com/280/00FF00?text=8" />
                    <img src="https://via.placeholder.com/250/00FF00?text=9" />
                    <img src="https://via.placeholder.com/260/00FF00?text=10" />
                    <img src="https://via.placeholder.com/270/00FF00?text=11" />
                    <img src="https://via.placeholder.com/280/00FF00?text=12" />
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