import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import settings from "../../settings";
import chroma from "chroma-js";
import { DarkModeContext } from "../../store/context";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

export default function MovieReviewCard({ review }: { review: MovieReview }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const expandedStateLabel = isExpanded ? "Collapse review content" : "Expand review content";
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return (
    <Card aria-label={`Review by ${review.author_details.username}`} $backgroundColor={theme.background_secondary} $borderColor={theme.background_secondary}>
      <ReviewAuthor $color={theme.foreground}>
        Review by <strong>{review.author_details.username}</strong>
      </ReviewAuthor>
      <ReviewContent $expanded={isExpanded} $color={theme.foreground} aria-expanded={isExpanded} data-testid="movie-review-card-content">
        {review.content}
      </ReviewContent>
      <ViewMoreButton onClick={toggleExpanded} aria-label={expandedStateLabel}>
        {isExpanded ? "View Less" : "View More"}
      </ViewMoreButton>
      <ReviewDate $color={theme.foreground} aria-label={`Review date: ${moment(review.created_at).format("MMMM Do, YYYY")}`}>
        Date: {moment(review.created_at).format("MMMM Do, YYYY")}
      </ReviewDate>
    </Card>
  );
}

interface CardProps {
  $backgroundColor: string;
  $borderColor: string;
}

const Card = styled.div<CardProps>`
  background: ${(props) => props.$backgroundColor};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${(props) => chroma(props.$borderColor).alpha(0.2).css()};
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

interface ReviewAuthorProps {
  $color: string;
}

const ReviewAuthor = styled.p<ReviewAuthorProps>`
  font-weight: bold;
  color: ${(props) => props.$color};
  margin-bottom: 10px;
`;

interface ReviewContentProps {
  $expanded: boolean;
  $color: string;
}

const ReviewContent = styled.p<ReviewContentProps>`
  color: ${(props) => props.$color};
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$expanded ? 'none' : '3')};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ViewMoreButton = styled.button`
  background: none;
  border: none;
  color: ${settings.colors.info};
  cursor: pointer;
  padding: 5px;
  padding-left: 0px;
  margin-top: 10px;
  font-size: 0.9em;
  &:hover {
    text-decoration: underline;
  }
`;

interface ReviewDateProps {
  $color: string;
}

const ReviewDate = styled.p<ReviewDateProps>`
  color: ${(props) => props.$color};
  font-size: 0.6em;
  margin-top: 10px;
  margin-bottom: 0;
`;
