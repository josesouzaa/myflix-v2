import { useParams } from 'react-router-dom'

import { useGetMovieById } from '../hooks/useGetMovieById'

export function Movie() {
  const { id } = useParams()

  const { data: movie } = useGetMovieById(id)

  if (movie)
    return (
      <section className="custom-container">
        <div className="grid grid-cols-1 gap-4 p-4 bg-black md:grid-cols-2 rounded-sm">
          <img
            className="rounded-sm"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">{movie.title}</h2>

            <div className="flex flex-col items-start divide-x-2 divide-red-600 divide-opacity-60 gap-4">
              <span
                className={`${
                  movie.vote_average >= 5 ? 'text-green-600' : 'text-red-600'
                } font-extrabold bg-gray-50 p-2 rounded-full self-start`}
              >
                {movie.vote_average.toFixed(1)}
              </span>

              <small className=" bg-red-600 bg-opacity-25 p-2 rounded-tr rounded-br">
                {movie.release_date}
              </small>

              <div className="bg-red-600 bg-opacity-25 flex items-center rounded-tr rounded-br">
                {movie.genres.map((g) => (
                  <small
                    key={g.name}
                    className="pl-2 pt-2 pb-2 last-of-type:pr-2"
                  >
                    {g.name}
                  </small>
                ))}
              </div>
            </div>

            <p className="bg-red-600 bg-opacity-25 p-2 rounded text-justify">
              {movie.overview}
            </p>
          </div>
        </div>
      </section>
    )
  return null
}
