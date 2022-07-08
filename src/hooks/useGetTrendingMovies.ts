import { useQuery } from 'react-query'

export interface TrendingMovies {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  media_type: string
  title: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

async function GetTrendingMovies(): Promise<TrendingMovies[]> {
  const req = await fetch(
    `${import.meta.env.VITE_TMDB_URL}/trending/movie/week?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
  const res = await req.json()
  return res.results
}

export function useGetTrendingMovies() {
  return useQuery('TrendingMovies', GetTrendingMovies)
}
