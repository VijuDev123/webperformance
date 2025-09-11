import React from "react";
import { useQuery } from "react-query";

import movieApiClient from "../utils/apiClient";
import MovieSlider from "./MovieSlider";

export default function UpcomingMovies() {
  const { data, isError, error, isLoading } = useQuery<
    ApiResponse<Movie>,
    Error
  >({
    queryKey: ["upcoming-movies"],
    queryFn: () => movieApiClient.getMovieListUpcoming(),
    retry: false,
  });

  return (
    <MovieSlider
      movieList={data?.results}
      headingText={"Upcoming"}
      error={error}
      loading={isLoading}
      listType={"upcoming"}
    />
  );
}

