
'use client'

import { useEffect, useRef } from "react";
import styles from "./ListItem.module.css"
import Link from "next/link";

interface props {
    id: string
}

export default function ListItem({ id }: props) {
    const container = useRef<HTMLDivElement>(null);
    const changeBackgroundImage = (backdrop_path: string): void => {
        container.current!.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
    }
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                changeBackgroundImage(response.backdrop_path);
            })
            .catch(err => console.error(err));
    }, [])
    return (
        <Link href={`browse/${id}`}>
            <div className={styles.list_item_container} ref={container}></div>
        </Link>
    )
}