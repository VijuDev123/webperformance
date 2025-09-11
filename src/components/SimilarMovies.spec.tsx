import React from "react";
import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../utils/test/testUtils";
import SimilarMovies from "./SimilarMovies";
import movieApiClient from "../utils/apiClient";

jest.mock("../utils/apiClient");

describe("SimilarMovies Component", () => {
  const mockMovies = [
    { id: "1", title: "Movie 1" },
    { id: "2", title: "Movie 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    (movieApiClient.getMovieSimilar as jest.Mock).mockResolvedValue({
      results: [],
    });

    await waitFor(() => {
      render(<SimilarMovies movieId="123" />);
      expect(screen.getByTestId("similar-movies-loading")).toBeInTheDocument();
    });
  });

  test("renders movies on successful fetch", async () => {
    (movieApiClient.getMovieSimilar as jest.Mock).mockResolvedValue({
      results: mockMovies,
    });
    render(<SimilarMovies movieId="123" />);

    await waitFor(() => {
      expect(screen.queryAllByTestId(/similar-movies-card-*/)).toHaveLength(
        mockMovies.length
      );
    });
  });

  test("renders error message on fetch failure", async () => {
    (movieApiClient.getMovieSimilar as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );
    
    render(<SimilarMovies movieId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId("similar-movies-error-message")).toBeInTheDocument();
    });
  });
});
