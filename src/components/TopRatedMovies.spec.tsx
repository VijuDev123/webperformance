import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../utils/test/testUtils";
import "@testing-library/jest-dom/extend-expect";

import TopRatedMovies from "./TopRatedMovies";
import movieApiClient from "../utils/apiClient";

jest.mock("../utils/movieApiClient");
jest.mock("./SimpleMovieCard", () => (props: any) => (
  <div data-testid={props["data-testid"]}>{props.movie.title}</div>
));

describe("TopRated Movies Component", () => {
  const mockMovieOne: Movie = {
    adult: false,
    original_title: "The Grand Adventure",
    poster_path: "/path/to/poster1.jpg",
    id: 101,
    release_date: "2023-01-01",
    title: "The Grand Adventure",
    overview: "An epic journey through fantastical landscapes.",
    backdrop_path: "/path/to/backdrop1.jpg",
    genre_ids: [12, 14, 16],
    original_language: "en",
    popularity: 8.5,
    video: false,
    vote_average: 7.9,
    vote_count: 200,
  };

  const mockedMovieTwo: Movie = {
    adult: false,
    original_title: "Mystery of the Lost City",
    poster_path: "/path/to/poster2.jpg",
    id: 102,
    release_date: "2023-03-15",
    title: "Mystery of the Lost City",
    overview: "A thrilling adventure in search of a lost ancient city.",
    backdrop_path: "/path/to/backdrop2.jpg",
    genre_ids: [10, 18],
    original_language: "en",
    popularity: 9.2,
    video: false,
    vote_average: 8.3,
    vote_count: 350,
  };

  const mockTopRatedMovies = {
    results: [mockMovieOne, mockedMovieTwo],
  };


  describe("Successful Fetch", () => {
    test("Given the movies are fetched successfully, When the data is loaded, Then it should display the list of top rated movies", async () => {
      (movieApiClient.getMovieListTopRated as jest.Mock).mockResolvedValueOnce(
        mockTopRatedMovies
      );
      render(<TopRatedMovies />);
      await waitFor(() => {
        expect(
          screen.getByTestId(`top-rated-movies-card-${mockMovieOne.id}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    test("Given the movies fetch results in an error, When an error occurs, Then it should display an error message", async () => {
      (movieApiClient.getMovieListTopRated as jest.Mock).mockRejectedValue(
        new Error("API Error")
      );
      render(<TopRatedMovies />);
      await waitFor(() => {
        expect(
          screen.getByTestId("top-rated-movies-error-message")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Empty Movie List", () => {
    test("Given the movies have been fetched, When the movies list is empty, Then it should not display any movies", async () => {
      (movieApiClient.getMovieListTopRated as jest.Mock).mockResolvedValueOnce({
        results: [],
      });
      render(<TopRatedMovies />);
      await waitFor(() => {
        expect(screen.queryAllByTestId(/top-rated-movies-card-*/).length).toBe(
          0
        );
      });
    });
  });
});
