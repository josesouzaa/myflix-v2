import { FilmCardHome } from '../components/FilmCardHome'

import { useGetTrendingMovies } from '../hooks/useGetTrendingMovies'

export function Home() {
  const { data: movies } = useGetTrendingMovies()

  return (
    <section className="custom-container">
      <h1 className="text-center text-5xl font-bold mb-10">
        Trending of the week
      </h1>

      {movies && (
        <ul className="mt-5 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <FilmCardHome key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  )
}
