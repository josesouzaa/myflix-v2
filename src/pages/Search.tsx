import { FormEvent, useState } from 'react'

import { FilmCardSearch } from '../components/FilmCardSearch'

import { useGetMovieByTitle } from '../hooks/useGetMovieByTitle'

export function Search() {
  const [title, setTitle] = useState('')
  const [titleForSearch, setTitleForSearch] = useState('')

  const { data: movies } = useGetMovieByTitle(titleForSearch)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTitleForSearch(title)
  }

  return (
    <section className="custom-container">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
        <h1 className="text-5xl font-bold">Search</h1>

        <form onSubmit={handleSubmit} className="flex group">
          <input
            className="text-black p-2 rounded-l-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            type="submit"
            className="rounded-r-sm bg-red-600 px-2 font-semibold hover:bg-red-500 transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
          >
            Search
          </button>
        </form>
      </div>

      {movies && (
        <ul className="mt-8 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <FilmCardSearch key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  )
}
