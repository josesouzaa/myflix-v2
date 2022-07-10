import { memo } from 'react'

import { Link } from 'react-router-dom'

import { TrendingMovies } from '../hooks/useGetTrendingMovies'

interface FilmCardWithTitleProps {
  movie: TrendingMovies
}

function FilmCardWithTitleComponent({ movie }: FilmCardWithTitleProps) {
  return (
    <li className="bg-black rounded-sm overflow-hidden shadow-md group hover:scale-105 transition duration-300">
      <Link to={`/movie/${movie.id}`} className="flex flex-col relative">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `${'https://image.tmdb.org/t/p/original/xujdtM1rkqmRIQXeopuL355ciwJ.jpg'}`
          }
          alt={movie.title}
        />

        <h2 className="absolute top-0 left-0 w-full h-full bg-black/50 font-bold text-lg flex justify-center items-center text-center p-4 -translate-x-full group-hover:translate-x-0 transition duration-300">
          {movie.title}
        </h2>
      </Link>
    </li>
  )
}

export const FilmCardWithTitle = memo(
  FilmCardWithTitleComponent,
  (prev, next) => {
    return Object.is(prev.movie, next.movie)
  }
)
