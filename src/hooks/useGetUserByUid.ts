import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase'

interface SessionData {
  id?: string | null
  uid?: string | null
  name?: string | null
  email?: string | null
  avatar?: string | null
  bio?: string
}

export async function useGetUserByUid(uid: string) {
  const users = collection(db, 'users')
  const q = query(users, where('uid', '==', uid))
  const result = await getDocs(q)
  return result
}

export async function useGetUserOnDb(uid: string): Promise<SessionData> {
  let data = {} as SessionData
  const users = collection(db, 'users')
  const q = query(users, where('uid', '==', uid))
  const result = await getDocs(q)

  if (!result.empty) {
    result.forEach((r) => {
      data = { id: r.id, ...r.data() }
    })
  }

  return data || {}
}
