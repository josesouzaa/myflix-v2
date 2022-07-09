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
    await signInWithPopup(auth, provider)
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
