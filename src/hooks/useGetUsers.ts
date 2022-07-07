import { useQuery } from 'react-query'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/firebase'

async function GetUsers() {
  const req = await getDocs(collection(db, 'users'))
  req.forEach((user) => console.log(user.data()))
}

export function useGetUsers() {
  return useQuery('Users', () => GetUsers())
}
