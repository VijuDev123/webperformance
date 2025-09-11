// api types
type ApiResponse<T> = {
  results: T[];
  page: number;
  total_results: number;
  total_pages: number;
};

type Movie = {
  adult: boolean;
  original_title: string;
  poster_path: string;
  id: number;
  release_date: string;
  title: string;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieGenre = {
  id: string;
  name: string;
};

type FullMovieResponse = {
  backdrop_path: string;
  budget: 63000000;
  poster_path: string;
  genres: MovieGenre[];
  id: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

type ReviewAuthorDetails = {
  id: string;
  name: string;
  rating: number;
  avatar_path: string;
  username: string;
};

type MovieReview = {
  id: string;
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
};

type ApiError = {
  message: string;
  isError: true;
};

type ApiResponseGeneric<T> = ApiError | ApiResponse<T> | FullMovieResponse;


interface MovieImageResponse{
  backdrops: MovieImage[];
  posters: MovieImage[];
}

interface MovieImage {
  file_path: string;
}

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
}



// types.d.ts
declare module "*.css" {
  const url: string;
  export default url;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.jpeg" {
  const value: any;
  export = value;
}
