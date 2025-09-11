import React from "react";
import { getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Pagination, { PaginationProps } from "./Pagination";
import { render } from "../utils/test/testUtils";

describe("<Pagination />", () => {
  let onPageChangeMock: jest.Mock;
  let defaultProps: PaginationProps;

  beforeEach(() => { // Before each test
    onPageChangeMock = jest.fn(); // Create a new mock function for each test
    defaultProps = {
      currentPage: 1,
      onPageChange: onPageChangeMock,
      lastPage: 5,
    };
  });
  
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it("renders current page", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText("1")).toBeInTheDocument();
  });

  it('changes page on "next" click', async () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 1,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-next"));

    // Assert
    expect(paginationProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(paginationProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not change page on "next" click when on last page', async () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 5,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-next"));

    // Assert
    expect(onPageChangeMock).not.toHaveBeenCalled();

  });

  it('changes page on "previous" click', async () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 3,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-previous"));

    // Assert
    expect(paginationProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(paginationProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not change page on "previous" click when on first page', () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 1,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    user.click(getByTestId("btn-previous"));

    // Assert
    expect(paginationProps.onPageChange).not.toHaveBeenCalled();
  });

  it('changes page on "first" click', async () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 3,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-first"));

    // Assert
    expect(paginationProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('changes page on "last" click', async () => {
    // Arrange
    const user = userEvent.setup();

    const paginationProps = {
      ...defaultProps,
      currentPage: 3,
      lastPage: 5,
    };

    const { getByTestId } = render(<Pagination {...paginationProps} />);

    // Act
    await user.click(getByTestId("btn-last"));

    // Assert
    expect(paginationProps.onPageChange).toHaveBeenCalledWith(5);
  });
});