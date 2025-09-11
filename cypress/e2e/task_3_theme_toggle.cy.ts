describe('Dark Mode Toggle Functionality', () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.intercept("https://api.themoviedb.org/3/search/movie?*", {
        fixture: "movie-list-star-wars.json",
      }).as("getMoviesPageFirst");
    });

    describe('When the theme toggle is clicked', () => {
      it('The color of the background switches ', () => {
        // Assuming the default theme is light
  
        // Check for an element that changes with the theme
        cy.get('[data-testid=app-container]').should('have.css', 'background-color', 'rgb(223, 230, 233)')
    
        // Click the toggle to switch to dark mode
        cy.get('[data-testid=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed to dark
        cy.get('[data-testid=app-container]').should('have.css', 'background-color', 'rgb(45, 52, 54)')
  
        // Click again to switch back to light mode
        cy.get('[data-testid=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed back to light
        cy.get('[data-testid=app-container]').should('have.css', 'background-color', 'rgb(223, 230, 233)')
      });

      it('The color of the movie card switches', () => {  
        // Check for an element that changes with the theme
        cy.get("[data-testid^=movie-card-container]").should('have.css', 'background-color', 'rgb(223, 230, 233)');

        // Click the toggle to switch to dark mode
        cy.get('[data-testid=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed to dark
        cy.get("[data-testid^=movie-card-container]").should('have.css', 'background-color', 'rgb(45, 52, 54)');

        // Click again to switch back to light mode
        cy.get('[data-testid=dark-mode-toggle]').click({force: true});
    
        // Check that the theme has changed back to light
        cy.get("[data-testid^=movie-card-container]").should('have.css', 'background-color', 'rgb(223, 230, 233)');
      });
    })
  
    
  });
  