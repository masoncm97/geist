"use client";

import { createContext, useEffect } from "react";
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
  // return hours < 7 || hours > 18;
  return true;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const isDark = getIsDark();
  const currentTheme: Theme = isDark
    ? { themeType: ThemeType.Dark }
    : { themeType: ThemeType.Light };

  useEffect(() => {
    // Set the background color when the component mounts
    if (isDark) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }

    // Reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className={classNames(
          currentTheme.themeType == ThemeType.Dark ? "bg-black" : "bg-white",
          "w-screen no-scrollbar"
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
