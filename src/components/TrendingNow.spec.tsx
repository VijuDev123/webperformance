import React from "react";
import { screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../utils/test/testUtils";
import movieApiClient from "../utils/apiClient";
import TrendingNow from "./TrendingNow";

jest.mock("../utils/movieApiClient");

describe("TrendingNow", () => {
  beforeEach(() => {
    (movieApiClient.getMovieListNowPlaying as jest.Mock).mockReset();
  });

  it("should fetch and display movies if the API call is successful", async () => {
    // Given
    const mockMovies: Movie[] = [
      {
        adult: false,
        original_title: "Test Original Movie",
        poster_path: "/test.jpg",
        id: 1,
        release_date: "2022-02-02",
        title: "Test Movie",
        overview:
          "This is a test movie overview. It's supposed to be really long so we can test the plot shortening functionality as well.",
        backdrop_path: "/test-backdrop.jpg",
        genre_ids: [1, 2, 3],
        original_language: "en",
        popularity: 7.8,
        video: false,
        vote_average: 8.5,
        vote_count: 100,
      },
    ];

    (movieApiClient.getMovieListNowPlaying as jest.Mock).mockResolvedValueOnce({
      results: mockMovies,
    });

    // When
    await act(async () => {
      render(<TrendingNow />);
    });

    // Then
    expect(movieApiClient.getMovieListNowPlaying).toHaveBeenCalled();
  });

  test("should display an error message if the API call fails", async () => {
    // Given
    (movieApiClient.getMovieListNowPlaying as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    // When
    await act(async () => {
      render(<TrendingNow />);
    });

    // Then
    await waitFor(() =>
      expect(movieApiClient.getMovieListNowPlaying).toHaveBeenCalledTimes(1)
    );

    expect(screen.getByTestId("trending-movies-error-message")).toBeInTheDocument();
  });
});
