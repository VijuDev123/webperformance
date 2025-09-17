import React from "react";
import { Link, useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";

import MovieReviewList from "../components/movieReviews/MovieReviewList";
import { PageContainer } from "../components/styled";
import movieApiClient from "../utils/apiClient";
import MovieImages from "../components/MovieImages";
import SimilarMovies from "../components/SimilarMovies";
import MovieCredits from "../components/MovieCredits";
import settings from "../settings";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";
import { useQuery } from "react-query";
import SolidStar from "../components/styled/SolidStar";
import RegularStar from "../components/styled/RegularStar";

export default function MoviePage() {
  const { id } = useParams() as { id: string };
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const { data: movieData } = useQuery<FullMovieResponse, Error>({
    queryKey: ["movie-detail", id],
    queryFn: () => movieApiClient.getMovieDetail(id),
    retry: false,
  });

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <RegularStar key={i} /> : <SolidStar key={i} />);
    }
    return stars;
  };

  return (
    <PageContainer as="main">
      <MovieLayout>
        {movieData ? (
          <MoviePoster
            src={movieApiClient.buildMoviePosterUrl(movieData.poster_path)}
            alt={`${movieData.title} Poster`}
          />
        ) : (
          <PlaceholderPoster />
        )}
        <MovieDetailCard $backgroundColor={theme.background_secondary}>
          <MovieTitle $color={theme.foreground}>{movieData?.title}</MovieTitle>
          <MovieInfo $color={theme.foreground}>{movieData?.tagline}</MovieInfo>
          <MovieRating>
            {movieData && renderStars(Math.round(movieData.vote_average / 2))}
            <RatingLabel $color={theme.foreground}>
              Rating: {parseInt(String(movieData?.vote_average))} / 10
            </RatingLabel>
          </MovieRating>
          <MoviePlot $color={theme.foreground}>{movieData?.overview}</MoviePlot>
        </MovieDetailCard>
      </MovieLayout>
      <SimilarMovies movieId={id} />
      <MovieCredits movieId={id} />
      <MovieImages movieId={id} />
      <MovieReviewList movieId={id} />
      <BackButton to="/">← Go Back</BackButton>
    </PageContainer>
  );
}

// Styled components
const { breakpoints } = settings;

const PlaceholderPoster = styled.div`
  // Similar styles to MoviePoster
`;

interface MovieInfoProps {
  $color: string;
}

const MovieInfo = styled.p<MovieInfoProps>`
  color: ${(props) => props.$color};
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: ${settings.colors.info};
`;

interface RatingLabelProps {
  $color: string;
}

const RatingLabel = styled.span<RatingLabelProps>`
  color: ${(props) => props.$color};
  margin-left: 10px;
  font-size: 0.8em;
`;

interface MoviePlotProps {
  $color: string;
}

const MoviePlot = styled.div<MoviePlotProps>`
  padding-top: 20px;
  border-top: solid 1px ${chroma(settings.colors.foreground).alpha(0.1).css()};
  margin-top: 20px;
  color: ${(props) => props.$color};
`;

const MovieLayout = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  grid-gap: 40px;
  margin-bottom: 40px;
  margin-top: 40px;

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${breakpoints.md}) {
    width: 80%;
    margin: 0 auto;
  }
`;

interface MovieDetailCardProps {
  $backgroundColor: string;
}

const MovieDetailCard = styled.div<MovieDetailCardProps>`
  background: ${(props) => props.$backgroundColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${chroma(settings.colors.foreground).alpha(0.1).css()};

  @media (max-width: ${breakpoints.md}) {
    padding: 10px;
  }
`;

interface MovieTitleProps {
  $color: string;
}

const MovieTitle = styled.h1<MovieTitleProps>`
  margin-top: 0;
  font-size: 2.6em;
  color: ${(props) => props.$color};
  @media (max-width: ${breakpoints.md}) {
    font-size: 2em; // Adjust as needed
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: ${settings.colors.info};
  background-color: ${settings.colors.backgroundSecondary};
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    color: ${settings.colors.backgroundSecondary};
    text-decoration: none;
    background-color: ${chroma(settings.colors.info).alpha(0.8).css()};
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 8px 12px; // Adjust button size for smaller screens
  }
`;
