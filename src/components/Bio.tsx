import { useState } from 'react'

import { useAuth } from '../contexts/AuthContext'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'

import { useGetUserByUid } from '../hooks/useGetUserByUid'

import { Check, PencilSimple, X } from 'phosphor-react'

export function Bio() {
  const { session, setSession } = useAuth()

  const [isEditing, setIsEditing] = useState(false)

  const [bio, setBio] = useState(session.bio)

  async function handleChangeBio() {
    try {
      if (session.id && session.uid) {
        const user = doc(db, 'users', session.id)

        await updateDoc(user, {
          bio: bio
        })

        useGetUserByUid(session.uid).then((res) => {
          res.forEach((user) => setBio(user.get('bio')))
        })

        setSession({ ...session, bio })
      }
    } catch (error) {
      alert(error)
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <div className="relative">
      {session.bio && !isEditing && (
        <p className="mt-2 border p-2 rounded-sm border-red-900/80">
          {session.bio}
        </p>
      )}

      {session.bio && session.bio.length <= 0 && (
        <p className="mt-2 border p-2 rounded-sm border-red-900/80 opacity-60">
          Write your bio.
        </p>
      )}

      {isEditing && (
        <textarea
          className="block mt-2 border p-2 rounded-sm border-red-900/80 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 w-full"
          placeholder="Write your bio."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      )}

      {isEditing ? (
        <div className="absolute bottom-0 right-0 flex gap-[2px]">
          <button
            onClick={handleChangeBio}
            className="font-semibold text-xs flex items-center gap-[2px] bg-green-600 p-1 rounded-sm hover:brightness-90 transition"
          >
            Confirm <Check size={12} />
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="font-semibold text-xs flex items-center gap-[2px] bg-red-600 p-1 rounded-sm hover:brightness-90 transition"
          >
            Cancel <X size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsEditing(!isEditing)
            setBio(session.bio)
          }}
          className="absolute font-semibold text-xs bottom-0 right-0 flex items-center gap-[2px] bg-red-900/80 p-1 rounded-sm hover:brightness-75 transition"
        >
          Edit bio <PencilSimple size={12} />
        </button>
      )}
    </div>
  )
}
