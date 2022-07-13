import { SearchedMovies } from '../hooks/useGetMovieByTitle'

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../utils/firebase'

import { useAuth } from '../contexts/AuthContext'

import { Star, X } from 'phosphor-react'
import { useCallback } from 'react'

interface FavoritesButtonProps {
  movie: SearchedMovies
}

export function FavoritesButton({ movie }: FavoritesButtonProps) {
  const { session } = useAuth()
  const favorite = false

  const toggleFavorite = useCallback(async () => {
    try {
      if (session.id) {
        const userRef = doc(db, 'users', session.id)
        const userSnap = await getDoc(userRef)
        const isFavorite = userSnap.get('favorites')?.includes(movie.id)

        if (isFavorite) {
          await updateDoc(userRef, {
            favorites: arrayRemove(movie.id)
          })
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(movie.id)
          })
        }
      }
    } catch (err) {
      alert(err)
    }
  }, [])

  return (
    <>
      {favorite ? (
        <button
          type="button"
          onClick={toggleFavorite}
          className="text-xs font-thin bg-gray-600 p-[2px] rounded-sm flex items-center gap-[1px] absolute top-0 right-0 opacity-0 group-hover:opacity-80 translate-x-1/2 group-hover:translate-x-0 transition duration-500 hover:bg-red-600 z-50"
        >
          Remove from Favorites
          <X size={16} />
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleFavorite}
          className="text-xs font-thin bg-red-600 p-[2px] rounded-sm opacity-0 group-hover:opacity-80 translate-x-1/2 group-hover:translate-x-0 flex items-center gap-[1px] absolute top-0 right-0 transition duration-500 hover:bg-green-500 z-50"
        >
          Add to Favorites
          <Star className="text-yellow-500" size={16} />
        </button>
      )}
    </>
  )
}
