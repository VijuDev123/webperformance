import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import settings from "../settings";
import { ErrorMessage } from "./styled";
import LoadingIndicator from "./styled/LoadingIndicator";

interface MovieListProps {
  movieList: Movie[];
  error?: ApiError | null;
  loading?: boolean;
}

export default function MovieList({ movieList, error, loading }: MovieListProps) {
  return (
    <MovieListContainer>
      {loading && (
        <LoadingIndicator aria-live="polite" aria-busy={loading} data-testid="main-movie-list-loading"/>
      )}
      {!error && !loading && (
        <MovieCardListWrapper role="list" data-testid='movie-list'>
          {movieList && movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MovieCardListWrapper>
      )}
      {error && (
        <ErrorMessage aria-live="polite" data-testid="main-movie-list-error">{error.message}</ErrorMessage>
      )}
    </MovieListContainer>
  );
}

const MovieCardListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;

  @media (max-width: var(--breakpoint-lg)) {
    flex-direction: row;
  }

  @media (max-width: var(--breakpoint-md)) {
    flex-direction: row;
  }

  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
