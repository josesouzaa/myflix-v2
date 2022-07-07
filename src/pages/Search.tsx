import { FormEvent, useState } from 'react'
import { FilmCardHome } from '../components/FilmCardHome'

import { useGetMovieByTitle } from '../hooks/useGetMovieByTitle'

export function Search() {
  const [title, setTitle] = useState('')
  const [titleForSearch, setTitleForSearch] = useState('')

  const { data } = useGetMovieByTitle(titleForSearch)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTitleForSearch(title)
  }

  return (
    <div className="max-w-screen-lg mx-auto pb-8">
      <h1 className="text-center text-5xl font-bold mb-10">Search</h1>

      <form onSubmit={handleSubmit} className="flex group px-4 lg:px-0">
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

      {data && (
        <ul className="mt-8 grid px-4 lg:px-0 grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((movie) => (
            <FilmCardHome key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  )
}
