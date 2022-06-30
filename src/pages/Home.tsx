import { FilmCardHome } from '../components/FilmCardHome'

import { useGetTrendingMovies } from '../hooks/useGetTrendingMovies'

export function Home() {
  const { data } = useGetTrendingMovies()

  if (data)
    return (
      <div className="max-w-screen-lg mx-auto pb-8">
        <h1 className="text-center text-5xl font-bold mb-10">
          Trending of the week
        </h1>

        <ul className="mt-5 grid px-4 lg:px-0 grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((movie) => (
            <FilmCardHome key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    )
  return null
}
