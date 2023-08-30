import { IMovieDetails } from "../interfaces/IMovieDetails"

interface props {
    movieDetails : IMovieDetails
    setCurrentMovie : Function
}

export default function CarouselMovie({movieDetails, setCurrentMovie} : props){
    return(
        <img src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} alt={movieDetails.title} onClick={() => setCurrentMovie(movieDetails)}/>
    )
}