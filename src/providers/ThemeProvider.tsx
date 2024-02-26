"use client";

import { createContext } from "react";
import classNames from "classnames";

export enum ThemeType {
  Light,
  Dark,
}

export interface Theme {
  themeType: ThemeType;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<Theme>({
  themeType: ThemeType.Light,
});

const getIsDark = () => {
  const hours = new Date().getHours();
  return hours < 7 || hours > 18;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const isDark = getIsDark();
  const currentTheme: Theme = isDark
    ? { themeType: ThemeType.Dark }
    : { themeType: ThemeType.Light };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className={classNames(
          currentTheme.themeType == ThemeType.Dark ? "bg-black" : "bg-white",
          "h-[100%] w-screen"
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
