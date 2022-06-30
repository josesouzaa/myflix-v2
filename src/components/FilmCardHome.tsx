import { Link } from 'react-router-dom'

import { TrendingMovies } from '../hooks/useGetTrendingMovies'

interface FilmCardHomeProps {
  movie: TrendingMovies
}

export function FilmCardHome({ movie }: FilmCardHomeProps) {
  return (
    <li className="bg-black rounded-sm overflow-hidden shadow-md group">
      <Link to="/" className="flex flex-col">
        <img
          className="group-hover:hover:brightness-75 transition-all"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <h2 className="p-4 text-center text-xl font-bold">{movie.title}</h2>
      </Link>
    </li>
  )
}
