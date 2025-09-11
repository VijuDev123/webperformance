describe("Movie Search Functionality", () => {
  it("allows a user to search for movies", () => {
    // ARRANGE
    // Mock the API request
    cy.intercept("GET", "https://api.themoviedb.org/3/search/movie*", {
      fixture: "task_2_mock_search_terminator.json",
    }).as("searchMovies");

    cy.visit("http://localhost:3000");

    // Type into the search bar and click the search button
    cy.get("[data-testid=search-input]").type("Terminator");
    cy.get("[data-testid=search-button]").click();

    // Wait for the API call to complete
    cy.wait("@searchMovies");

    // Assert that movies are displayed
    cy.get("[data-testid=movie-list]").should("be.visible");
    cy.get("[data-testid^=movie-card-container]").should("have.length", 20);
  });
});
