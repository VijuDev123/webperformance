import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "../../store/redux/store";

interface MovieCardContainerProps {
  $backgroundColor: string;
}

const MovieCardContainerRaw = styled.div<MovieCardContainerProps>`
  display: flex;
  width: calc(50% - 20px);
  border: solid 1px ${(props) => props.$backgroundColor};
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 4px;
  box-sizing: border-box;
  height: 240px;
  background-color: ${(props) => props.$backgroundColor};
  &:hover {
    // background-color: #b2bec3;
    cursor: pointer;
    transform: scale(1.03);
    border-color: black;
  }
`;

export default function MovieCardContainer({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return (
    <MovieCardContainerRaw
      {...props}
      $backgroundColor={theme.background_secondary}
    >
      {children}
    </MovieCardContainerRaw>
  );
}
