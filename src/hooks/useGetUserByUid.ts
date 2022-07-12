import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase'

export async function useGetUserByUid(uid: string) {
  const users = collection(db, 'users')
  const q = query(users, where('uid', '==', uid))
  const result = await getDocs(q)
  return result
}
