import Header from './components/Header'

import { Router } from './Router'

export function App() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <Router />
      </main>
    </>
  )
}
