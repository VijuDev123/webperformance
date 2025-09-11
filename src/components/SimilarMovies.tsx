import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import movieApiClient from "../utils/apiClient";
import SimpleMovieCard from "./SimpleMovieCard";
import { PageSection, SectionTitle, ErrorMessage } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

interface SimilarMoviesProps {
  movieId: string;
}

export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { data, isError, error, isLoading } = useQuery<
    ApiResponse<Movie>,
    Error
  >({
    queryKey: ["similar-movies", movieId],
    queryFn: () => movieApiClient.getMovieSimilar(movieId),
    retry: false,
  });

  if (isError) {
    return (
      <ErrorMessage
        data-testid="similar-movies-error-message"
        aria-live="polite"
      >
        {error?.message}
      </ErrorMessage>
    );
  }

  if (isLoading) {
    return (
      <PageSection>
        <LoadingIndicator data-testid="similar-movies-loading" />
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby="similar-movies-heading">
      <SectionTitle>Similar Movies</SectionTitle>
      <SimilarMoviesContainer
        data-test-id={"similar-movies-container"}
        aria-label="List of top rated movies"
        role="list"
      >
        {data?.results?.map((movie: Movie) => (
          <SimpleMovieCard
            data-testid={`similar-movies-card-${movie.id}`}
            movie={movie}
            key={movie.id}
          />
        ))}
      </SimilarMoviesContainer>
    </PageSection>
  );
}

const SimilarMoviesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
