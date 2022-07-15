import { useQuery } from 'react-query'

export interface SearchedMovies {
  adult: boolean
  backdrop_path: string
  genre_ids?: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

async function GetMovieByTitle(
  title: string
): Promise<SearchedMovies[] | null> {
  if (title.length <= 2) {
    return null
  }

  const req = await fetch(
    `${import.meta.env.VITE_TMDB_URL}/search/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&query=${title}`
  )
  const res = await req.json()
  return res.results
}

export function useGetMovieByTitle(title: string) {
  return useQuery(['SearchByTitle', title], () => GetMovieByTitle(title))
}
