import React from "react";
import { useQuery } from "react-query";

import movieApiClient from "../utils/apiClient";
import MovieSlider from "./MovieSlider";

export default function TrendingNow() {
  const { data, error, isLoading } = useQuery<
    ApiResponse<Movie>,
    Error
  >({
    queryKey: ["top-rated-movies"],
    queryFn: () => movieApiClient.getMovieListNowPlaying(),
    retry: false,
    initialData: {
      results: [],
      page: 0,
      total_results: 0,
      total_pages: 0
    }
  });

  return (
    <MovieSlider
      movieList={data?.results}
      headingText={"Trending"}
      error={error}
      loading={isLoading}
      listType={"trending"}
    />
  );
}

