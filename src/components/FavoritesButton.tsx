import { SearchedMovies } from '../hooks/useGetMovieByTitle'

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '../utils/firebase'

import { useAuth } from '../contexts/AuthContext'

import { Star, X } from 'phosphor-react'
import { useCallback } from 'react'
import { useGetMovieOnDdById } from '../hooks/useGetMovieOnDdById'

interface FavoritesButtonProps {
  movie: SearchedMovies
}

export function FavoritesButton({ movie }: FavoritesButtonProps) {
  const favorite = true
  const { session } = useAuth()

  const addMovieToFavorites = useCallback(async () => {
    try {
      if (session.id) {
        let whoLikedFromDb = [] as String[]
        const result = await useGetMovieOnDdById(movie.id)
        result.forEach((r) =>
          r.get('whoLiked')
            ? (whoLikedFromDb = [...r.get('whoLiked')])
            : (whoLikedFromDb = [])
        )

        if (result.empty) {
          await addDoc(collection(db, 'favorites'), {
            ...movie,
            whoLiked: arrayUnion(session.id)
          })
        } else if (!result.empty && !whoLikedFromDb.includes(session.id)) {
          let id = ''
          result.forEach((r) => (id = r.id))
          const movieOnDb = doc(db, 'favorites', id)
          await updateDoc(movieOnDb, {
            whoLiked: arrayUnion(session.id)
          })
        }
      }
    } catch (err) {
      alert(err)
    }
  }, [])

  const removeMovieFromFavorites = useCallback(async () => {
    try {
      if (session.id) {
        let MovieId = ''
        let whoLikedFromDb = [] as String[]

        const result = await useGetMovieOnDdById(movie.id)

        result.forEach((r) => {
          r.get('whoLiked')
            ? (whoLikedFromDb = [...r.get('whoLiked')])
            : (whoLikedFromDb = [])
          MovieId = r.id
        })

        if (whoLikedFromDb.length > 1) {
          const movieOnDb = doc(db, 'favorites', MovieId)
          await updateDoc(movieOnDb, {
            whoLiked: arrayRemove(session.id)
          })
        } else if (whoLikedFromDb.length <= 1) {
          await deleteDoc(doc(db, 'favorites', MovieId))
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
          onClick={removeMovieFromFavorites}
          className="text-xs font-thin bg-gray-600 p-[2px] rounded-sm flex items-center gap-[1px] absolute top-0 right-0 opacity-0 group-hover:opacity-80 translate-x-1/2 group-hover:translate-x-0 transition duration-500 hover:bg-red-600 z-50"
        >
          Remove from Favorites
          <X size={16} />
        </button>
      ) : (
        <button
          type="button"
          onClick={addMovieToFavorites}
          className="text-xs font-thin bg-red-600 p-[2px] rounded-sm opacity-0 group-hover:opacity-80 translate-x-1/2 group-hover:translate-x-0 flex items-center gap-[1px] absolute top-0 right-0 transition duration-500 hover:bg-green-500 z-50"
        >
          Add to Favorites
          <Star className="text-yellow-500" size={16} />
        </button>
      )}
    </>
  )
}
