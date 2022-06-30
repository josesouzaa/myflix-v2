import { Link } from 'react-router-dom'

import { TrendingMovies } from '../hooks/useGetTrendingMovies'

interface FilmCardHomeProps {
  movie: TrendingMovies
}

export function FilmCardHome({ movie }: FilmCardHomeProps) {
  return (
    <li className="bg-black rounded-sm overflow-hidden shadow-md group hover:scale-105 transition">
      <Link to="/" className="flex flex-col relative">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <h2 className="absolute top-0 left-0 w-full h-full bg-black/50 font-bold text-lg flex justify-center items-center text-center p-4 -translate-x-full group-hover:translate-x-0 transition">
          {movie.title}
        </h2>
      </Link>
    </li>
  )
}
