import React from "react";
import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router-dom";

import settings from "../settings";
import chroma from "chroma-js";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

export default function Header() {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return (
    <HeaderContainer $backgroundColor={theme.foreground} $color={theme.foreground}>
      <HeaderWrapper role="navigation" aria-label="Movie App">
        <HeaderLink to="/">
          <HeaderHeading>The Movie App</HeaderHeading>
        </HeaderLink>
        <DarkModeToggle></DarkModeToggle>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${settings.colors.backgroundSecondary};
`;

const HeaderHeading = styled.h4`
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  font-weight: 500;
  text-decoration: none;
  color: ${settings.colors.background};
`;

interface HeaderContainerProps{
  $backgroundColor: string;
  $color: string;
}

const HeaderContainer = styled.div<HeaderContainerProps>`
  width: 100%;
  background-color: ${settings.colors.foreground};
  border-bottom: 1px solid ${props => chroma(props.$color).alpha(0.3).css()};
  color: ${props => props.$color};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
