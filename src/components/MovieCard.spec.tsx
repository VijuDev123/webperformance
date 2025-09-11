import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../utils/test/testUtils";
import MovieCard from "./MovieCard";

const mockMovie: Movie = {
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
};

describe("Given a MovieCard component", () => {
  describe("When it receives a movie prop", () => {
    // Arrange
    beforeEach(() => {
      render(<MovieCard movie={mockMovie} />);
    });

    test("Then it should display the correct movie information", () => {
      // Act - No explicit act as we're testing the result of the Arrange phase.

      // Assert
      expect(
        screen.getByTestId(`movie-card-title-${mockMovie.id}`)
      ).toHaveTextContent(mockMovie.title);
      expect(screen.getByText(`Release Date: Feb 2nd, 2022`)).toBeInTheDocument();
      expect(
        screen.getByText(`Plot: ${mockMovie.overview.slice(0, 250)}...`)
      ).toBeInTheDocument();
    });

    describe("And the movie's plot is longer than 250 characters", () => {
      test("Then it should shorten the displayed plot text", () => {
        // Arrange
        const longPlot = "a".repeat(300);
        render(<MovieCard movie={{ ...mockMovie, overview: longPlot }} />);

        // Act - No explicit act as we're testing the result of the Arrange phase.

        // Assert
        expect(
          screen.getByText(`Plot: ${longPlot.slice(0, 250)}...`)
        ).toBeInTheDocument();
      });
    });
  });
});
