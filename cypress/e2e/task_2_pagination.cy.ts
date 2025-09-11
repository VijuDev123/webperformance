describe('Pagination Component Tests', () => {
  beforeEach(() => {
    // Common setup for all tests: Mock API responses
    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie?query=*&page=1&api_key=*', {
      fixture: 'task_2_mock_pagination_terminator_page_1.json'
    }).as('getMoviesPageFirst');

    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie?query=*&page=2&api_key=*', {
      fixture: 'task_2_mock_pagination_terminator_page_2.json'
    }).as('getMoviesPageSecond');

    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie?query=*&page=5&api_key=*', {
      fixture: 'task_2_mock_pagination_terminator_page_5.json'
    }).as('getMoviesPageLast');

    // Visit the home page
    cy.visit("http://localhost:3000");
  });

  it('navigates to the next page correctly', () => {
    cy.wait('@getMoviesPageFirst');
    cy.get('[data-testid=btn-next]').click();
    cy.wait('@getMoviesPageSecond');
    cy.get('[data-testid=movie-card-container-40027]').should("be.visible");
  });

  it('navigates to the previous page correctly', () => {
    cy.get('[data-testid=btn-next]').click(); // Move to the second page first
    cy.wait('@getMoviesPageSecond');
    cy.get('[data-testid=btn-previous]').click();
    cy.wait('@getMoviesPageFirst');
    cy.get('[data-testid=movie-card-container-87101]').should("be.visible");
  });

  it('navigates to the last page correctly', () => {
    cy.get('[data-testid=btn-last]').click();
    cy.wait('@getMoviesPageLast');
    cy.get('[data-testid=movie-card-container-80638]').should("be.visible");
  });

  it('navigates to the first page correctly', () => {
    cy.get('[data-testid=btn-next]').click(); // Move to the second page first
    cy.wait('@getMoviesPageSecond');
    cy.get('[data-testid=btn-first]').click();
    cy.wait('@getMoviesPageFirst');
    cy.get('[data-testid=movie-card-container-87101]').should("be.visible");
  });
});
