describe("Movie Search Functionality", () => {
  it("allows a user to search for movies by pressing Enter", () => {
    // ARRANGE
    cy.intercept("GET", "https://api.themoviedb.org/3/search/movie*", {
      fixture: "task_2_mock_search_terminator.json",
    }).as("searchMovies");

    cy.visit("http://localhost:3000");

    // ACT
    // Type into the search bar and press Enter
    cy.get("[data-testid=search-input]").type("Terminator{enter}");

    // ASSERT
    cy.wait("@searchMovies");
    cy.get("[data-testid=movie-list]").should("be.visible");
    cy.get("[data-testid^=movie-card-container]").should("have.length", 20);
  });
});
