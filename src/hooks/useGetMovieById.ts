import { useQuery } from 'react-query'

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface SearchedMovie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: any
  budget: number
  genres?: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: any
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export async function GetMovieById(
  id?: string | number
): Promise<SearchedMovie> {
  const req = await fetch(
    `${import.meta.env.VITE_TMDB_URL}/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
  const res = await req.json()
  return res
}

export function useGetMovieById(id?: string) {
  return useQuery('SearchById', () => GetMovieById(id))
}
