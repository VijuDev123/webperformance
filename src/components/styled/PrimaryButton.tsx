import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

interface PrimaryButtonRawProps {
  $labelColour: string;
}

const PrimaryButtonRaw = styled.button<PrimaryButtonRawProps>`
  height: 40px;
  display: flex;
  width: 200px;
  background-color: #6c5ce7;
  border-color: #6c5ce7;
  color: ${(props) => props.$labelColour};
  font-weight: 700;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  border-width: 0px;
  margin-right: 4px;
  margin-left: 4px;
  &:hover {
    background-color: ${chroma("#6c5ce7").saturate().hex()};
    cursor: pointer;
  }
  &:disabled {
    background-color: ${chroma("#6c5ce7").desaturate(3).hex()};
    cursor: normal;
  }
`;

export default function PrimaryButton({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const theme = useSelector((state:RootState) => state.themeReducer.theme);
  return (
    <PrimaryButtonRaw {...props} $labelColour={theme.background}>
      {children}
    </PrimaryButtonRaw>
  );
}
