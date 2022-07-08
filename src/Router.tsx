import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Movie } from './pages/Movie'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  )
}
