import React from "react";

import SimpleMovieCard from "./SimpleMovieCard";
import LoadingIndicator from "./styled/LoadingIndicator";

import {
  ErrorMessage,
  MovieSliderContainer,
  PageSection,
  SectionTitle,
} from "./styled";
import SimpleSliderCardPlaceHolder from "./SimpleSliderCardPlaceHolder";

interface MovieSliderProps {
  movieList: Movie[] | undefined;
  error?: Error | null;
  headingText: string;
  listType?: "upcoming" | "trending" | "top-rated";
  loading?: boolean;
}
const moviePlaceholderList = Array.from({ length: 20 }, (_, i) => i + 1);

export default function MovieSlider({
  movieList,
  error,
  headingText,
  listType,
  loading,
}: MovieSliderProps) {
  if (loading) {
    return (
      <PageSection>
        <SectionTitle>{headingText}</SectionTitle>
        <MovieSliderContainer
          data-testid={`${listType}-movies-container-loading`}
          aria-label={`List of ${movieList} movies loading`}
          role="list"
        >
          {moviePlaceholderList.map((key: number) => (
            <SimpleSliderCardPlaceHolder key={key} />
          ))}
        </MovieSliderContainer>
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection aria-labelledby={`${listType}-movies-heading}`}>
        <ErrorMessage
          data-testid={`${listType}-movies-error-message`}
          aria-live="polite"
        >
          {error?.message}
        </ErrorMessage>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby={`${listType}-movies-heading}`}>
      <SectionTitle>{headingText}</SectionTitle>
      <MovieSliderContainer
        data-testid={`${listType}-movies-container`}
        aria-label={`List of ${movieList} movies`}
        role="list"
      >
        {movieList?.map((movie) => (
          <SimpleMovieCard
            movie={movie}
            key={movie.id}
            data-testid={`${listType}-movies-card-${movie.id}`}
          />
        ))}
      </MovieSliderContainer>
    </PageSection>
  );
}
