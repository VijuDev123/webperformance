import React from "react";
import { Theme, ThemeName, themeList } from "./theme";

export const DarkModeContext = React.createContext({
  theme: themeList.light,
  setTheme: (themeName: ThemeName): void => {},
  toggleTheme: (): void => {},
});
