import { memo } from 'react'

import { Link } from 'react-router-dom'

import { SearchedMovies } from '../hooks/useGetMovieByTitle'
import { FavoritesButton } from './FavoritesButton'

interface FilmCardWithInfosProps {
  movie: SearchedMovies
}

function FilmCardWithInfosComponent({ movie }: FilmCardWithInfosProps) {
  return (
    <li className="bg-black rounded-sm overflow-hidden shadow-md group hover:scale-105 transition duration-300">
      <Link to={`/movie/${movie.id}`} className="flex flex-col relative">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : `${'https://image.tmdb.org/t/p/original/egklJGMJguEvyG3bxSqrhxXi3Af.jpg'}`
          }
          alt={movie.title}
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex flex-col gap-4 p-4 -translate-x-full group-hover:translate-x-0 transition duration-300 hide-scroll">
          <h2 className="text-3xl font-bold">{movie.title}</h2>

          <small className="text-gray-400">{movie.release_date}</small>

          <span
            className={`${
              movie.vote_average >= 5 ? 'text-green-600' : 'text-red-600'
            } font-extrabold bg-gray-50 p-2 rounded-full self-start`}
          >
            {movie.vote_average.toFixed(1)}
          </span>

          <p className="bg-red-800 p-2 rounded-sm text-sm text-justify">
            {movie.overview}
          </p>
        </div>

        <FavoritesButton movie={movie} />
      </Link>
    </li>
  )
}

export const FilmCardWithInfos = memo(
  FilmCardWithInfosComponent,
  (prev, next) => {
    return Object.is(prev.movie, next.movie)
  }
)
