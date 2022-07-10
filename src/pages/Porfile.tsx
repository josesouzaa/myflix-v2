import { useAuth } from '../contexts/AuthContext'

export function Porfile() {
  const { session } = useAuth()

  return <section className="custom-container bg-black">Porfile</section>
}
