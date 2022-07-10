import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Movie } from './pages/Movie'
import { Porfile } from './pages/Porfile'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/porfile/:id" element={<Porfile />} />
    </Routes>
  )
}
