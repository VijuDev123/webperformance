import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { PageContainer } from "../components/styled";
import movieApiClient from "../utils/apiClient";
import TrendingNow from "../components/TrendingNow";
import UpcomingMovies from "../components/UpcomingMovies";
import TopRated from "../components/TopRatedMovies";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputParam = searchParams.get("search") || "Star Wars";
  const currentPageParam = Number(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const [searchText, setSearchText] = useState<string>(searchInputParam);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setFetchError] = useState<ApiError | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  async function getMovies(searchText: string, currentPage: number) {
    // Set loading to true before the request starts
    setLoading(true);

    // Fetch the movies from the api
    const response = await movieApiClient.getMovieList(searchText, currentPage);
    if ("message" in response) {
      setFetchError({
        message: "An error ocurred while fetching the movies",
        isError: true,
      });
    } else {
      setMovieList(response.results);
      setTotalPages(response.total_pages);
      setSuggestions([]);
    }
    // Set loading to false after the request is finished
    setLoading(false);

    // Update the url with the new search params
    setSearchParams({ search: searchText, page: currentPage.toString() });
  }

  // get suggestions from the api
  async function getSuggestions(text: string) {
    const response = await movieApiClient.getMovieList(text, 1);
    // missing error and loading state
    if (!("message" in response)) {
      setSuggestions(response.results.map((movie) => movie.title));
    }
  }

  // Fetch the movies when the component mounts
  useEffect(() => {
    getMovies(searchText, currentPage);
  }, []);

  function onSearchButtonClick() {
    setSuggestions([]);
    setCurrentPage(1);
    getMovies(searchText, 1);
  }

  function onChangeSearchText(text: string) {
    if (text === "") {
      setSuggestions([]);
      setSearchText("");
    } else {
      setSearchText(text);
      getSuggestions(text);
    }
  }

  function onPageChange(page: number) {
    setCurrentPage(page);
    getMovies(searchText, page);
  }

  function onSuggestionClick(suggestion: string) {
    setSearchText(suggestion);
    setCurrentPage(1);
    getMovies(suggestion, 1);
  }

  return (
    <PageContainer>
      <button
        onClick={() => {
          throw new Error("Test Error");
        }}
      >
        Button
      </button>
      <SearchBar
        onSuggestionClick={onSuggestionClick}
        onChange={onChangeSearchText}
        value={searchText}
        onButtonClick={onSearchButtonClick}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      <MovieList movieList={movieList} error={error} loading={loading} />
      <Pagination
        currentPage={currentPage}
        lastPage={totalPages}
        onPageChange={onPageChange}
      />
      <TrendingNow />
      <TopRated />
      <UpcomingMovies />
    </PageContainer>
  );
}
