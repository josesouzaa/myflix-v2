import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { provider } from '../utils/firebase'

import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'

interface SessionData {
  uid?: string | null
  name?: string | null
  email?: string | null
  avatar?: string | null
  bio?: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  logIn: () => void
  logOut: () => void
  session: SessionData
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState({} as SessionData)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setSession({
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
        bio: ''
      })
    })
  }, [auth])

  const logIn = useCallback(async () => {
    const { user } = await signInWithPopup(auth, provider)
    const users = collection(db, 'users')
    const q = query(users, where('uid', '==', user.uid))
    const qResult = await getDocs(q)

    if (qResult.docs.length <= 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        bio: ''
      })
    }
  }, [])

  const logOut = useCallback(async () => {
    await signOut(auth)
    setSession({})
  }, [])

  return (
    <AuthContext.Provider value={{ logIn, logOut, session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
