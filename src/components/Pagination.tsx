import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/redux/store";

export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  lastPage: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  lastPage,
}: PaginationProps) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return (
    <PaginationContainer>
      <PaginationButton
        data-testid="btn-first"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        first
      </PaginationButton>
      <PaginationButton
        data-testid="btn-previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        previous
      </PaginationButton>
      <PaginationNumber $color={theme.foreground}>{currentPage}</PaginationNumber>
      <PaginationButton
        data-testid="btn-next"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next
      </PaginationButton>
      <PaginationButton
        data-testid="btn-last"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(lastPage)}
      >
        last
      </PaginationButton>
    </PaginationContainer>
  );
}

interface PaginationNumberProps {
  $color: string;
}

const PaginationNumber = styled.p<PaginationNumberProps>`
  font-weight: 700;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  color: ${(props) => props.$color};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  align-items: center;
  padding-top: 20px;
`;


const PaginationButton = styled.button`
  height: 40px;
  display: flex;
  width: 200px;
  background-color: #0984e3;
  border-color: #0984e3;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  border-width: 0px;
  margin-right: 4px;
  margin-left: 4px;
  text-transform: uppercase;
  &:hover {
    background-color: #0984e3;
    cursor: pointer;
  }
  &:disabled {
    background-color: grey;
    cursor: normal;
  }
`;
