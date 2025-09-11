beforeEach(() => {

  // home page fixture
  cy.intercept("https://api.themoviedb.org/3/search/movie?*", {
    fixture: "movie-list-star-wars.json",
  }).as("getMoviesPageFirst");
});

describe("When the user lands on the home page", () => {
  it("the first 20 movies are displayed", () => {
    cy.visit("http://localhost:3000");

    cy.wait('@getMoviesPageFirst');

    cy.get("[data-testid=movie-card-container-11]").should("be.visible");
  });
});
