/// <reference types="cypress" />

describe("Upcoming Component Tests", () => {
    it("Given the upcoming movies API call is successful, When the page loads, Then it should display the upcoming movies", () => {    
      // Arrange
      cy.intercept("GET",  '**/movie/upcoming?api_key=*', {
        fixture: "task_1_upcoming_movies.json",
      }).as("getUpcomingMovies");
  
      cy.visit("http://localhost:3000");
  
      // Act
      cy.wait("@getUpcomingMovies");
  
      // Assert
      cy.get("[data-testid=upcoming-movies-container]").should("be.visible");
      cy.get("[data-testid^=upcoming-movies-card]").should("have.length", 20); // Adjust the number as per your fixture data
    });
  
    it('Given the upcoming movies API call fails, When the page loads, Then it should display an error message', () => {
      // Arrange
      cy.intercept('GET', '**/movie/upcoming?api_key=*', { statusCode: 500, body: { message: 'Server Error' } }).as('getUpcomingMoviesFail');
      cy.visit('http://localhost:3000');
  
      // Act
      cy.wait('@getUpcomingMoviesFail');
  
      // Assert
      cy.get('[data-testid=upcoming-movies-error-message]').should('be.visible');
      cy.get('[data-testid^=upcoming-movies-card]').should('not.exist');
    });
  });
  