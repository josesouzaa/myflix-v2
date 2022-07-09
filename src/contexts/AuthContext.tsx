import { createContext, ReactNode, useContext } from 'react'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  logIn: () => void
  logOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  async function logIn() {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
  }

  async function logOut() {
    const result = await signOut(auth)
    console.log(result)
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
