'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import CurrentMovie from "../components/CurrentMovie"
import Carousel from "../components/Carousel"
import { useState } from "react"
import { IMovieDetails } from "../interfaces/IMovieDetails"

export default function Browse() {
    const route = useRouter();
    let [currentMovie, setCurrentMovie] = useState<IMovieDetails>();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            route.push('/signin');
        },
    });
    return (
        <main>
            <Header></Header>
            <CurrentMovie currentMovie={currentMovie!}></CurrentMovie>
            <div className="carousels_container">
                <Carousel type="popular" setCurrentMovie={setCurrentMovie}></Carousel>
                <Carousel type="top_rated" setCurrentMovie={setCurrentMovie}></Carousel>
                <Carousel type="upcoming" setCurrentMovie={setCurrentMovie}></Carousel>
            </div>
        </main>
    )
}