import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'

import { useGetUserByUid } from '../hooks/useGetUserByUid'

interface SessionData {
  id?: string | null
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
  setSession: Dispatch<SetStateAction<SessionData>>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState({} as SessionData)
  const [isLoading, setIsLoading] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        let id
        let bio
        const result = await useGetUserByUid(user.uid)

        result.forEach((r) => {
          id = r.id
          bio = r.get('bio') || ''
        })

        if (!isLoading) {
          setSession({
            id,
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            avatar: user?.photoURL,
            bio
          })
        }
      }
    })
  }, [auth, isLoading])

  const logIn = useCallback(async () => {
    try {
      setIsLoading(true)
      const { user } = await signInWithPopup(auth, provider)
      const result = await useGetUserByUid(user.uid)

      if (result.empty) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL
        })
      }
    } catch (err) {
      alert(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logOut = useCallback(async () => {
    await signOut(auth)
    setSession({})
  }, [])

  return (
    <AuthContext.Provider value={{ logIn, logOut, session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
