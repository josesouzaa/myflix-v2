import { SignOut } from 'phosphor-react'

import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function AuthButton() {
  const { logIn, logOut, session } = useAuth()

  return (
    <>
      {session.email ? (
        <div className="flex">
          <Link
            to="/"
            className="px-2 py-1 bg-red-600 rounded-l-full font-bold hover:bg-red-700 transition"
          >
            View profile
          </Link>
          <button
            className="flex items-center gap-1 hover:bg-gray-300 bg-gray-50 text-black rounded-r-full px-2 py-1"
            type="button"
            onClick={logOut}
          >
            <SignOut size={20} />
          </button>
        </div>
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
