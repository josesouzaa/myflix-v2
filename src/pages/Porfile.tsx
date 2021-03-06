import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import { Bio } from '../components/Bio'
import { FilmCardWithInfos } from '../components/FilmCardWithInfos'

import { GetMovieById, SearchedMovie } from '../hooks/useGetMovieById'
import { ArrowsClockwise } from 'phosphor-react'

export function Porfile() {
  const [favorites, setFavorites] = useState([] as SearchedMovie[])

  const { session } = useAuth()

  function reloadFavorites() {
    const filtredFavorites = [] as SearchedMovie[]

    if (session.favorites) {
      if (session.favorites.length > 0) {
        session.favorites?.forEach(async (movie) => {
          const res = await GetMovieById(movie)

          filtredFavorites.push(res)
          setFavorites([...new Set(filtredFavorites)])
        })
      } else {
        setFavorites([])
      }
    } else {
      setFavorites([])
    }
  }

  useEffect(() => {
    reloadFavorites()
  }, [])

  if (session.id)
    return (
      <section className="custom-container">
        <div className="bg-black rounded-sm p-2 sm:p-4 flex flex-col md:flex-row items-center gap-4">
          {session.avatar && session.name && (
            <img
              className="rounded-full ring-1 ring-red-600/70"
              src={
                session.avatar ||
                'https://lh3.googleusercontent.com/a-/AFdZucrzxouOluImvdcbIsLovB57iNqMCG5Bj4ZDx7g9Vw=s96-c'
              }
              alt={session.name}
            />
          )}
          <div className="bg-red-600/30 p-2 sm:p-4 rounded-sm flex-1 w-full">
            <h2 className="font-bold text-xl">{session.name}</h2>

            <span className="text-gray-400">{session.email}</span>

            <Bio />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <h3 className="text-lg font-bold">My favorites movies</h3>
            <button
              className="flex items-center gap-[2px] bg-red-600 px-2 py-1 rounded-sm hover:bg-red-500 transition"
              type="button"
              onClick={reloadFavorites}
            >
              Reload <ArrowsClockwise size={16} />
            </button>
          </div>
          {favorites.length > 0 ? (
            <ul className="mt-8 grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((movie) => (
                <FilmCardWithInfos key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <p className="w-full text-center mt-8">
              No movies in favorites, or reloads to sync
            </p>
          )}
        </div>
      </section>
    )
  return <p className="w-full text-center">Please login to continue</p>
}
