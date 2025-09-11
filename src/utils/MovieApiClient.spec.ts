import MovieApiClient from "./MovieApiClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import placeholder from "../assets/movie-placeholder.png";

describe("ApiClient", () => {
  let apiClient: MovieApiClient;
  let mock: MockAdapter;

  const mockApiUrl = "https://api.example.com";
  const mockApiKey = "testapikey";
  const mockMovieId = "123";
  const mockData = { data: "some data" };

  beforeAll(() => {
    mock = new MockAdapter(axios);
    apiClient = new MovieApiClient(mockApiUrl, mockApiKey);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getMovieDetail fetches movie details correctly", async () => {
    const url = `${mockApiUrl}/movie/${mockMovieId}?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);
    const data = await apiClient.getMovieDetail(mockMovieId);
    expect(data).toEqual(mockData);
  });

  test("getMovieList fetches movies based on search text correctly", async () => {
    // Arrange
    const searchText = "star wars";
    const currentPage = 1;
    const url = `${mockApiUrl}/search/movie?query=${searchText}&page=${currentPage}&api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieList(searchText, currentPage);

    // Assert
    expect(data).toEqual(mockData);
  });

  test("getMovieReviewList fetches movie reviews correctly", async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/${mockMovieId}/reviews?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieReviewList(mockMovieId);

    // Assert
    expect(data).toEqual(mockData);
  });

  test("getMovieListNowPlaying fetches now playing movies correctly", async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/now_playing?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieListNowPlaying();

    // Assert
    expect(data).toEqual(mockData);
  });

  test("getMovieSimilar fetches similar movies correctly", async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/${mockMovieId}/recommendations?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieSimilar(mockMovieId);

    // Assert
    expect(data).toEqual(mockData);
  });

  test("getMovieListTopRated fetches top rated movies correctly", async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/top_rated?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieListTopRated();

    // Assert
    expect(data).toEqual(mockData);
  });

  test("getMovieListUpcoming fetches upcoming movies correctly", async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/upcoming?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);

    // Act
    const data = await apiClient.getMovieListUpcoming();

    // Assert
    expect(data).toEqual(mockData);
  });

  test('getMovieImages fetches movie images correctly', async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/${mockMovieId}/images?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);
  
    // Act
    const data = await apiClient.getMovieImages(mockMovieId);
  
    // Assert
    expect(data).toEqual(mockData);
  });

  test('getMovieCredits fetches movie credits correctly', async () => {
    // Arrange
    const url = `${mockApiUrl}/movie/${mockMovieId}/credits?api_key=${mockApiKey}`;
    mock.onGet(url).reply(200, mockData);
  
    // Act
    const data = await apiClient.getMovieCredits(mockMovieId);
  
    // Assert
    expect(data).toEqual(mockData);
  });
  
});
