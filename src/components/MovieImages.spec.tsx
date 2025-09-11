import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import MovieImages from './MovieImages';
import apiClient from '../utils/apiClient';
import { render } from '../utils/test/testUtils';

jest.mock('../utils/apiClient');

describe('MovieImages', () => {
  const movieId = '123';
  const mockImagesData = {
    posters: [
      { file_path: '/image1.jpg' },
      { file_path: '/image2.jpg' }
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays a loading indicator initially', async () => {
    (apiClient.getMovieImages as jest.Mock).mockResolvedValue(mockImagesData);
    render(<MovieImages movieId={movieId} />);
    await waitFor(() => {
      expect(screen.getByTestId('movie-images-loading')).toBeInTheDocument();
    });
  });

  test('displays images when data is successfully fetched', async () => {
    (apiClient.getMovieImages as jest.Mock).mockResolvedValue(mockImagesData);
    render(<MovieImages movieId={movieId} />);

    await waitFor(() => {
      expect(screen.queryByTestId('movie-images-loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('image-0')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/image1.jpg');
      expect(screen.getByTestId('image-1')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/image2.jpg');
    });
  });

  test('displays an error message when data fetching fails', async () => {
    (apiClient.getMovieImages as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<MovieImages movieId={movieId} />);

    await waitFor(() => {
      expect(screen.queryByTestId('movie-images-loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('movie-images-error-message')).toBeInTheDocument();    });
  });
});
