/// <reference types="cypress" />

describe("Trending Component Tests", () => {
    it("Given the trending movies API call is successful, When the page loads, Then it should display the trending movies", () => {
      // Arrange
      cy.intercept("GET", "**/movie/now_playing?api_key=*", {
        fixture: "task_1_trending_movies.json",
      }).as("getTrendingMovies");
  
      cy.visit("http://localhost:3000");
  
      // Act
      cy.wait("@getTrendingMovies");
  
      // Assert
      cy.get("[data-testid=trending-movies-container]").should("be.visible");
      cy.get("[data-testid^=trending-movies-card]").should("have.length", 20); // Adjust the number as per your fixture data
    });
  
    it("Given the trending movies API call fails, When the page loads, Then it should display an error message", () => {
      // Arrange
      cy.intercept("GET", "**/movie/now_playing?api_key=*", {
        statusCode: 500,
        body: { message: "Server Error" },
      }).as("getTrendingMoviesFail");
      cy.visit("http://localhost:3000");
  
      // Act
      cy.wait("@getTrendingMoviesFail");
  
      // Assert
      cy.get("[data-testid=trending-movies-error-message]").should(
       "be.visible"
      );
      cy.get("[data-testid=trendings-movie-card]").should("not.exist");
    });
  });
  