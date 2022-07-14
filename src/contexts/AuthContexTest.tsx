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

import { useGetUserByUid, useGetUserOnDb } from '../hooks/useGetUserByUid'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from 'react-query'
import { useNavigate } from 'react-router-dom'

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
  session: SessionData | undefined
  refetchSession: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<SessionData, unknown>>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [userUid, setUserUid] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = getAuth()

  const navigate = useNavigate()

  const {
    data: session,
    refetch: refetchSession,
    isRefetching
  } = useQuery('session', () => useGetUserOnDb(userUid))

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        console.log(user)
        setUserUid(user.uid)
        refetchSession()

        if (!isLoading) {
          refetchSession()
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
    setUserUid('')
    refetchSession()

    if (!isRefetching) {
      navigate('/')
      console.log(session)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ logIn, logOut, session, refetchSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
