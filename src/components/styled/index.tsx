import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import { DarkModeContext } from "../../store/context";
import settings from "../../settings";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";

export const PageContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
`;

interface SectionTitleProps {
  $color: string;
}

const SectionTitleStyled = styled.h2<SectionTitleProps>`
  font-size: 1.4em;
  color: ${(props) => props.$color};
  margin-bottom: 10px;
  margin-top: 0px;
  font-weight: 600;
  padding-left: 4px;
`;

export function SectionTitle({children}: {children: React.ReactNode}) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return <SectionTitleStyled $color={theme.foreground}>{children}</SectionTitleStyled>;
}

interface PageSectionProps {
  $backgroundColor: string;
  $borderColor: string;
}

const PageSectionStyled = styled.section<PageSectionProps>`
  border-radius: 4px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
  padding: 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.$backgroundColor};
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${(props) => chroma(props.$borderColor).alpha(0.2).css()};
`;

export function PageSection({
  props,
  children,
}: {
  props?: React.HTMLProps<HTMLElement>;
  children?: React.ReactNode;
}) {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  return (
    <PageSectionStyled $backgroundColor={theme.background_secondary} $borderColor={theme.foreground} >
      {children}
    </PageSectionStyled>
  );
}

export const ErrorMessage = styled.p`
  color: ${settings.colors.error};
  background-color: ${settings.colors.background};
  border-left: 5px solid ${settings.colors.error};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
`;

export const LoadingComponent = styled.div`
  color: ${settings.colors.foreground};
  background-color: ${settings.colors.background};
  border-left: 5px solid ${settings.colors.foreground};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
`;

export const MovieSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PrimaryButton = styled.button`
  height: 40px;
  display: flex;
  width: 200px;
  background-color: ${settings.colors.info};
  border-color: ${settings.colors.info};
  color: ${settings.colors.background};
  font-weight: 700;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  margin-right: 4px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
  margin-left: 4px;
  border-radius: 4px;
  &:hover {
    background-color: ${settings.colors.info};
    box-shadow: 0 2px 12px ${settings.colors.shadow};
    cursor: pointer;
  }
  &:disabled {
    background-color: ${chroma(settings.colors.foreground).alpha(0.1).css()};
    cursor: normal;
  }
`;
