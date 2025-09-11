import React from "react";
import styled from "styled-components";
import movieApiClient from "../../utils/apiClient";
import MovieReviewCard from "./MovieReviewCard";
import { ErrorMessage } from "../styled";
import LoadingIndicator from "../styled/LoadingIndicator";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";
import { useQuery } from "react-query";

export default function MovieReviewList({ movieId }: { movieId: string }) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const {
    data: reviewList,
    error,
    isLoading,
  } = useQuery<ApiResponse<MovieReview>, Error>({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => movieApiClient.getMovieReviewList(movieId),
    retry: false,
  });

  console.log(reviewList, error, isLoading)

  if (error) {
    return (
      <ReviewListContainer>
        <ErrorMessage
          aria-live="assertive"
          data-testid="movie-review-list-error"
        >
          Error loading movie reviews
        </ErrorMessage>
      </ReviewListContainer>
    );
  }

  if (isLoading) {
    return (
      <ReviewListContainer>
        <LoadingIndicator data-testid="movie-review-list-loader" />
      </ReviewListContainer>
    );
  }

  return (
    <ReviewListContainer aria-label="Movie reviews list">
      <ReviewsHeading data-testid="movie-review-list" $color={theme.foreground}>
        User Reviews
      </ReviewsHeading>
      {reviewList?.results?.map((review) => (
        <MovieReviewCard review={review} key={review.id} />
      ))}
    </ReviewListContainer>
  );
}

const ReviewListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

interface ReviewsHeadingProps {
  $color: string;
}

const ReviewsHeading = styled.h3<ReviewsHeadingProps>`
  color: ${({ $color }) => $color};
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  font-size: 1.6em;
`;
