import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import {
  ErrorMessage,
  PageSection,
  SectionTitle,
} from "./styled";
import settings from "../settings";
import { RootState } from "../store/redux/store";
import movieApiClient from "../utils/apiClient";
import LoadingIndicator from "./styled/LoadingIndicator";

interface MovieCreditsProps {
  movieId: string;
}

const MovieCredits = ({ movieId }: MovieCreditsProps) => {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const {
    data,
    isError,
    error,
    isFetching,
  } = useQuery<MovieCreditsResponse, Error>({
    queryKey: ["movie-credits", movieId],
    queryFn: () => movieApiClient.getMovieCredits(movieId),
    retry: false
  });

  /* START: And Example of a very expensive computation */
  function someExpensiveComputation() {
    let result = 1;
    for (let i = 0; i < 1000000000; i++) {
      // console.log(`Progress: ${i/100000} %`);
      result += i;
    }
    return result;
  }

  // render a message if there is an error
  if (isError) {
    return (
      <PageSection>
        <ErrorMessage data-testid="movie-credits-error-message">
          {error?.message}
        </ErrorMessage>
      </PageSection>
    );
  }

  // render a loading component while fetching data
  if (isFetching) {
    return (
      <PageSection>
        <LoadingIndicator data-testid="movie-credits-loading" />
      </PageSection>
    );
  }

  const expensiveResult = someExpensiveComputation();
  /* END: And Example of a very expensive computation */

  return (
    <PageSection>
      <SectionTitle>Cast</SectionTitle>
      <CastList>
        {data?.cast.map((castMember, index) => (
          <CastMemberItem key={index}>
            <CastMemberImage
              src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
              alt={castMember.name}
            />
            <CastMemberName
              $color={theme.foreground}
              data-testid={`cast-name-${castMember.id}`}
            >
              {castMember.name}
            </CastMemberName>
            <CastMemberCharacter $color={theme.foreground}>
              as {castMember.character}
            </CastMemberCharacter>
          </CastMemberItem>
        ))}
      </CastList>
    </PageSection>
  );
};

export default MovieCredits;

const CastList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 0px;
`;

const CastMemberItem = styled.li`
  width: 200px;
  text-align: center;
  width: 200px;
  text-align: left;
  height: auto;
  margin-right: 20px;
  max-height: 350px;
`;

const CastMemberImage = styled.img`
  height: 240px;
  object-fit: cover;
  width: 200px;
  border-radius: 4px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
`;

interface CastMemberNameProps {
  $color: string;
}

const CastMemberName = styled.p<CastMemberNameProps>`
  font-size: 1em;
  color: ${(props) => props.$color};
  margin-top: 8px;
  font-weight: bold;
  margin-bottom: 0px;
`;

interface CastMemberCharacterProps {
  $color: string;
}

const CastMemberCharacter = styled.p<CastMemberCharacterProps>`
  font-size: 0.8em;
  color: ${(props) => props.$color};
  margin-top: 0px;
  margin-bottom: 0px;
`;
