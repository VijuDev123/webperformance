import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import SimpleSliderCard from "./SimpleMovieCard";
import movieApiClient from "../utils/apiClient";
import { render } from "../utils/test/testUtils";

jest.mock("../utils/apiClient", () => ({
  buildMoviePosterUrl: jest.fn(),
}));

describe("SimpleMovieCard", () => {
  const mockMovie = {
    adult: false,
    original_title: "Original Title",
    poster_path: "poster.jpg",
    id: 1,
    release_date: "2022-01-01",
    title: "Movie Title",
    overview: "Movie Overview",
    backdrop_path: "backdrop.jpg",
    genre_ids: [1, 2, 3],
    original_language: "en",
    popularity: 7.5,
    video: false,
    vote_average: 8.0,
    vote_count: 100,
  };

  beforeEach(() => {
    (movieApiClient.buildMoviePosterUrl as jest.Mock).mockReturnValue(
      "http://example.com/poster.jpg"
    );
  });

  test("should render movie card with correct image source", () => {
    render(<SimpleSliderCard movie={mockMovie} data-testid="movie-card" />);

    // Act
    const movieImage = screen.getByTestId(`simple-movie-card-${mockMovie.id}`);

    // Assert
    expect(movieImage).toHaveAttribute("src", "http://example.com/poster.jpg");
    expect(movieImage).toHaveAttribute("alt", `${mockMovie.title} poster`);
  });

  test("should navigate to movie details on card click", async () => {
    const user = userEvent.setup();

    render(<SimpleSliderCard movie={mockMovie} data-testid="movie-card" />);

    // Act
    const movieCard = screen.getByTestId(`movie-card`);
    await user.click(movieCard);

    // Assert
    const link = movieCard.querySelector("a");
    expect(link).toHaveAttribute("href", `/movie/${mockMovie.id}`);
  });
});
