import { createSlice } from "@reduxjs/toolkit";
import { Theme, ThemeName, themeList } from "../theme";

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: themeList.light,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      // pure function
      if (state.theme.name === ThemeName.LIGHT) {
        state.theme = themeList.dark;
      } else {
        state.theme = themeList.light;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
