import { useAuth } from '../contexts/AuthContext'

import { Bio } from '../components/Bio'

export function Porfile() {
  const { session } = useAuth()

  return (
    <section className="custom-container">
      <div className="bg-black rounded-sm p-2 sm:p-4 flex flex-col md:flex-row items-center gap-4">
        {session.avatar && session.name && (
          <img
            className="rounded-full ring-1 ring-red-600/70"
            src={session.avatar}
            alt={session.name}
          />
        )}
        <div className="bg-red-600/30 p-2 sm:p-4 rounded-sm flex-1">
          <h2 className="font-bold text-xl">{session.name}</h2>

          <span className="text-gray-400">{session.email}</span>

          <Bio />
        </div>
      </div>
    </section>
  )
}
