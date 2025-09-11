import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import movieApiClient from "../utils/apiClient";
import {
  ErrorMessage,
  LoadingComponent,
  PageSection,
  SectionTitle,
} from "./styled";
import settings from "../settings";
import e from "express";

interface MovieImagesProps {
  movieId: string;
}

const MovieImages = ({ movieId }: MovieImagesProps) => {
  const { data, error, isLoading } = useQuery<MovieImageResponse, Error>({
    queryKey: ["movie-credits", movieId],
    queryFn: () => movieApiClient.getMovieImages(movieId),
    retry: false,
  });

  if (isLoading) {
    return (
      <PageSection>
        <LoadingComponent
          aria-live="polite"
          data-testid="movie-images-loading"
        />
      </PageSection>
    );
  }

  if (error) {
    return (
      <PageSection>
        <ErrorMessage
          aria-live="assertive"
          data-testid="movie-images-error-message"
        >
          Error loading movie images
        </ErrorMessage>
      </PageSection>
    );
  }

  return (
    <PageSection aria-labelledby="movie-images-heading">
      <SectionTitle>Movie Posters</SectionTitle>
      <ImagesContainer>
        {data?.posters?.map((image, index) => (
          <Image
            key={index}
            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
            alt={`Movie scene ${index + 1}`}
            data-testid={`image-${index}`}
          />
        ))}
      </ImagesContainer>
    </PageSection>
  );
};

export default MovieImages;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: scroll;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
  transition: transform 0.3s ease-in-out;
  margin-right: 10px;
  &:hover {
    transform: scale(1.03);
  }
`;
