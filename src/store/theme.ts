export enum ThemeName {
  LIGHT = "light",
  DARK = "dark",
}

export type Theme = {
  name: ThemeName;
  foreground: string;
  background: string;
  background_secondary: string;
};

export const themeList: Record<string, Theme> = {
  light: {
    name: ThemeName.LIGHT,
    foreground: "#2d3436",
    background: "#dfe6e9",
    background_secondary: "#ffffff",
  },
  dark: {
    name: ThemeName.DARK,
    foreground: "#dfe6e9",
    background: "#2d3436",
    background_secondary: "#636e72",
  },
};
