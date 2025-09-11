import React from "react";
import styled from "styled-components";
import { DarkModeContext } from "../../store/context";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

interface SectionHeadingRawProps {
  $textColor: string;
}

export const SectionHeadingRaw = styled.h1<SectionHeadingRawProps>`
  width: 100%;
  text-align: left;
  padding-left: 10px;
  color: ${(props) => props.$textColor};
`;

export default function SectionHeading({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return (
    <SectionHeadingRaw {...props} $textColor={theme.foreground}>
      {children}
    </SectionHeadingRaw>
  );
}
