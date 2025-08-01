"use client";

import { createContext, useEffect, useState } from "react";
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
  // return hours < 7 || hours > 22;
  return true;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>({ themeType: ThemeType.Light });

  useEffect(() => {
    // Update theme based on local time after component mounts
    const isDark = getIsDark();
    setCurrentTheme(isDark ? { themeType: ThemeType.Dark } : { themeType: ThemeType.Light });
  }, []);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className={classNames(
          currentTheme.themeType == ThemeType.Dark ? "bg-black" : "bg-white",
          "w-screen"
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
