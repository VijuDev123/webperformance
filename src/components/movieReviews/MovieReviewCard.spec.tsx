import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import 'jest-styled-components'

import { render } from '../../utils/test/testUtils';
import MovieReviewCard from './MovieReviewCard';

describe('MovieReviewCard Component', () => {
  const mockReview: MovieReview = {
    id: 'review123',
    author: 'John Doe',
    content: "This is a great movie!",
    author_details: {
      id: 'user123',
      name: 'John Doe',
      rating: 8,
      avatar_path: '/avatar.jpg',
      username: 'JohnDoe'
    },
    created_at: '2020-01-01T00:00:00.000Z'
  };

  it('should initially render with collapsed content', () => {
    // Arrange
    render(<MovieReviewCard review={mockReview} />);

    // Act
    const content = screen.getByTestId('movie-review-card-content');

    // Assert
    expect(content).toBeInTheDocument();
    expect(content).toHaveStyleRule('-webkit-line-clamp', '3');
    expect(screen.getByText('View More')).toBeInTheDocument();
  });

  it('should toggle expanded state on button click', () => {
    // Arrange
    render(<MovieReviewCard review={mockReview} />);
    const button = screen.getByText('View More');

    // Act
    fireEvent.click(button);

    // Assert
    const content = screen.getByText(mockReview.content);
    expect(content).toHaveStyleRule('-webkit-line-clamp', 'none');
    expect(screen.getByText('View Less')).toBeInTheDocument();

    // Act
    fireEvent.click(button);

    // Assert
    expect(content).toHaveStyleRule('-webkit-line-clamp', '3');
    expect(screen.getByText('View More')).toBeInTheDocument();
  });

  it('should correctly format the review date', () => {
    // Arrange
    render(<MovieReviewCard review={mockReview} />);

    // Act
    const formattedDate = moment(mockReview.created_at).format("MMMM Do, YYYY");
    
    // Assert
    expect(screen.getByText(`Date: ${formattedDate}`)).toBeInTheDocument();
  });
});
