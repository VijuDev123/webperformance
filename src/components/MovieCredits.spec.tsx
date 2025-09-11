import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MovieCredits from "./MovieCredits";
import movieApiClient from "../utils/apiClient";
import { render } from "../utils/test/testUtils";

jest.mock("../utils/apiClient");

describe("MovieCredits Component", () => {
  const mockCredits = {
    cast: [
      {
        id: 1,
        name: "Actor 1",
        character: "Character 1",
        profile_path: "/path1.jpg",
      },
      {
        id: 2,
        name: "Actor 2",
        character: "Character 2",
        profile_path: "/path2.jpg",
      },
    ],
  };


  let list;

  beforeEach(() => {
    // jest.clearAllMocks();
    // something I need to do after each test
    list = []
    const myValue = { value: 1 };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {

  });

  test("should initially show the loading state", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue(
      mockCredits
    );
    await waitFor(() => {
      render(<MovieCredits movieId="123" />);
      expect(screen.getByTestId("movie-credits-loading")).toBeInTheDocument();
    });
  });

  test("should display cast members when data is successfully fetched", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue(
      mockCredits
    );
    render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(screen.getByTestId("cast-name-1")).toBeInTheDocument();
      expect(screen.getByTestId("cast-name-2")).toBeInTheDocument();
    });
  });

  test("should display an error message when there is an API error", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockImplementation(
      async () => {
          throw new Error("API Error");
      }
    );

    await render(<MovieCredits movieId="1235" />);

    await waitFor(() =>
      expect(movieApiClient.getMovieCredits as jest.Mock).toHaveBeenCalledTimes(
        1
      )
    );

    expect(movieApiClient.getMovieCredits as jest.Mock).toHaveBeenCalledWith("1235")

    await waitFor(() => {
      expect(movieApiClient.getMovieCredits as jest.Mock).rejects.toThrow(new Error("API Error"));

      
      expect(
        screen.getByTestId("movie-credits-error-message")
      ).toBeInTheDocument();
    });
  });

  test("should handle an empty cast list", async () => {
    (movieApiClient.getMovieCredits as jest.Mock).mockResolvedValue({
      cast: [],
    });
    render(<MovieCredits movieId="123" />);
    await waitFor(() => {
      expect(screen.queryAllByTestId("cast-member-item").length).toBe(0);
    });
  });

  // Optional: Test for the component re-fetching data when the movieId prop changes
  test("should refetch data when the movieId prop changes", async () => {
    const mockCredits2 = {
      cast: [
        {
          id: 3,
          name: "Actor 3",
          character: "Character 3",
          profile_path: "/path3.jpg",
        },
      ],
    };

    const mockFetch = movieApiClient.getMovieCredits as jest.Mock;
    mockFetch
      .mockResolvedValueOnce(mockCredits)
      .mockResolvedValueOnce(mockCredits2);

    const { rerender } = render(<MovieCredits movieId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId("cast-name-1")).toBeInTheDocument();
      expect(screen.getByTestId("cast-name-2")).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      rerender(<MovieCredits movieId="456" />);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId("cast-name-3")).toBeInTheDocument();
    });
  });
});
