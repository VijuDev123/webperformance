import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Header from "./Header";
import { render } from "../utils/test/testUtils";

describe("Given the Header component", () => {
  describe("When it is rendered", () => {
    // Arrange
    beforeEach(() => {
      render(<Header />);
    });

    test("Then it should display the correct header title", () => {
      // Act
      const headerTitle = screen.getByRole("navigation");

      // Assert
      expect(headerTitle).toBeVisible();
    });
  });
});
