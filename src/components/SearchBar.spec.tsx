import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";
import { render } from "../utils/test/testUtils";

describe("SearchBar Component", () => {
  const mockOnChange = jest.fn();
  const mockOnButtonClick = jest.fn();
  const mockSetSuggestions = jest.fn();
  const mockOnSuggestionClick = jest.fn();
  const mockValue = "test";
  const mockSuggestions = ["suggestion1", "suggestion2"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (value = mockValue, suggestions = mockSuggestions) =>
    render(
      <SearchBar
        onChange={mockOnChange}
        onButtonClick={mockOnButtonClick}
        value={value}
        suggestions={suggestions}
        setSuggestions={mockSetSuggestions}
        onSuggestionClick={mockOnSuggestionClick}
      />
    );

  // Test input change
  test("should call onChange when typing in the search input", () => {
    renderComponent();
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  // Test button click
  test("should call onButtonClick when the search button is clicked", () => {
    renderComponent();
    const button = screen.getByTestId("search-button");
    fireEvent.click(button);
    expect(mockOnButtonClick).toHaveBeenCalled();
  });

  // Test keyboard event
  test("should call onButtonClick when Enter is pressed", () => {
    renderComponent();
    const input = screen.getByTestId("search-input");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnButtonClick).toHaveBeenCalled();
  });

  // Test clicking on a suggestion
  test("should call onSuggestionClick when a suggestion is clicked", () => {
    renderComponent();
    const suggestion = screen.getByText("suggestion1");
    fireEvent.click(suggestion);
    expect(mockOnSuggestionClick).toHaveBeenCalledWith("suggestion1");
  });

  // Test edge cases
  test("should not display suggestions when there are none", () => {
    renderComponent(mockValue, []);
    expect(screen.queryByTestId("suggestion-container")).toBeNull();
  });
});
