import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { screen, waitFor } from "@testing-library/react";

import { render } from "../utils/test/testUtils"; // custom render function
import MovieList from "./MovieList";


const movieOne = {
  adult: false,
  original_title: "The Original Movie",
  poster_path: "/path/to/poster.jpg",
  id: 1234,
  release_date: "2023-06-30",
  title: "The Movie",
  overview: "This is a movie",
  backdrop_path: "/path/to/backdrop.jpg",
  genre_ids: [1, 2, 3],
  original_language: "en",
  popularity: 7.8,
  video: false,
  vote_average: 8.5,
  vote_count: 100,
};

describe("MovieList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays movie cards when API call is successful", async () => {
    // Arrange
    const movieList = [movieOne];

    // Act
    render(<MovieList movieList={movieList}/>);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("The Movie")).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    // Arrange
    const error = { message: "Failed to fetch", isError: true } as ApiError;

    // Act
    render(<MovieList error={error} movieList={[]}/>);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  test("does not display movie cards when movie list is empty", async () => {
    // Act
    await act(async () => {
      render(<MovieList movieList={[]} />);
    });

    // Assert
    expect(screen.queryByTestId("movie-card")).toBeNull();
  });
});
