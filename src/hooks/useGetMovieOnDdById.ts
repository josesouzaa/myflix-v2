import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase'

export async function useGetMovieOnDdById(id: number) {
  const favorites = collection(db, 'favorites')
  const q = query(favorites, where('id', '==', id))
  const result = await getDocs(q)
  return result
}
