import { SignOut } from 'phosphor-react'

import { useAuth } from '../contexts/AuthContext'

export default function AuthButton() {
  const { logIn, logOut, session } = useAuth()

  return (
    <>
      {session.email ? (
        <button
          type="button"
          onClick={logOut}
          className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded-full font-bold hover:bg-red-700 transition"
        >
          {session.email}
          <SignOut size={20} />
        </button>
      ) : (
        <button
          type="button"
          onClick={logIn}
          className="px-2 py-1 bg-red-600 rounded-full font-bold hover:bg-red-700 transition"
        >
          LogIn with Google
        </button>
      )}
    </>
  )
}
