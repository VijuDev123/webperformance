import React from "react";
import { screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../utils/test/testUtils";
import MovieReviewList from "./MovieReviewList";
import movieApiClient from "../../utils/apiClient";

jest.mock("../../utils/apiClient", () => ({
  getMovieReviewList: jest.fn(),
}));

beforeEach(() => jest.clearAllMocks());
afterEach(() => jest.clearAllMocks());

describe("MovieReviewList", () => {
  const mockMovieId = "123";
  const mockReviewList: MovieReview[] = [
    {
      id: "1",
      author: "John Doe",
      author_details: {
        id: "1",
        username: "JohnDoe",
        name: "John Doe",
        avatar_path: "/path/to/avatar.jpg",
        rating: 8.5,
      },
      content: "Great movie!",
      created_at: "2022-01-01",
    },
    {
      id: "2",
      author: "Jane Smith",
      author_details: {
        id: "2",
        username: "JaneSmith",
        name: "Jane Smith",
        avatar_path: "/path/to/avatar.jpg",
        rating: 9.0,
      },
      content: "Awesome performance!",
      created_at: "2022-01-02",
    },
  ];

  test("should render review list correctly", async () => {
    // Arrange
    (movieApiClient.getMovieReviewList as jest.Mock).mockResolvedValueOnce({
      results: mockReviewList,
    });

    // Act
    render(<MovieReviewList movieId={mockMovieId} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("movie-review-list")).toBeInTheDocument();
      expect(movieApiClient.getMovieReviewList).toHaveBeenCalledWith(mockMovieId);
      
      screen.findByText("Great movie!")

      expect(screen.getByText("Great movie!")).toBeInTheDocument();
      expect(screen.getByText("Awesome performance!")).toBeInTheDocument();
    })

  });

  test("should render error message when fetch fails", async () => {
    // Arrange

    (movieApiClient.getMovieReviewList as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    // Act
    await act(async () => {
      return render(<MovieReviewList movieId={mockMovieId} />);
    });

    // Await for the error message to appear
    await waitFor(() =>
      expect(movieApiClient.getMovieReviewList).toHaveBeenCalledTimes(1)
    );

    await waitFor(() => {
      expect(screen.getByTestId("movie-review-list-error")).toBeInTheDocument();
    });

  });
});
