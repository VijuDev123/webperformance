import React, { useContext } from "react";
import Toggle from "react-toggle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { themeList } from "../store/theme";
import { toggleTheme } from "../store/redux/themeSlice";
import { RootState } from "../store/redux/store";

export default function DarkModeToggle() {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <ToggleContainer>
      <Toggle
        defaultChecked={theme === themeList.dark}
        data-testid="dark-mode-toggle"
        onChange={() => {
          dispatch(toggleTheme());
        }}
      />
      <ToggleLabel $color={theme.background_secondary}>Dark Mode</ToggleLabel>
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


interface ToggleLabelProps {
  $color: string;
}

const ToggleLabel = styled.span<ToggleLabelProps>`
  margin-left: 10px;
  color: ${(props) => props.$color};
`;
