"use client";

import classNames from "classnames";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the structure of the theme state
interface Theme {
  main: "default" | "softy";
  sidebar: "white" | "light" | "dark" | "theme";
  sidenav: "light" | "theme" | "dark" | "white";
  sidebarVisibility: boolean;
  sidebarMobile: boolean;
  header: "white" | "light" | "dark" | "theme";
  skin: "light" | "dark";
}

interface ThemeUpdate {
  uistyle: (value: "default" | "softy") => void;
  sidebar: (value: "white" | "light" | "dark" | "theme") => void;
  sidenav: (value: "light" | "theme" | "dark" | "white") => void;
  sidebarVisibility: () => void;
  sidebarHide: () => void;
  header: (value: "white" | "light" | "dark" | "theme") => void;
  skin: (value: "light" | "dark") => void;
  reset: () => void;
}

// Create context for the theme state
const ThemeContext = createContext<Theme | undefined>(undefined);

// Create context for the theme update functions
const ThemeUpdateContext = createContext<ThemeUpdate | undefined>(undefined);

// Custom hook to use the theme context
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Custom hook to use the theme update context
export function useThemeUpdate(): ThemeUpdate {
  const context = useContext(ThemeUpdateContext);
  if (!context) {
    throw new Error("useThemeUpdate must be used within a ThemeProvider");
  }
  return context;
}

// Define the props for the ThemeProvider
export interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const defaultTheme: Theme = {
    main: "default",
    sidebar: "white",
    sidenav: "light",
    sidebarVisibility: false,
    sidebarMobile: false,
    header: "white",
    skin: "light",
  };

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const themeUpdate: ThemeUpdate = {
    uistyle: (value: "default" | "softy") => {
      setTheme({ ...theme, main: value });
    },
    sidebar: (value: "white" | "light" | "dark" | "theme") => {
      setTheme({ ...theme, sidebar: value });
    },
    sidenav: (value: "light" | "theme" | "dark" | "white") => {
      setTheme({ ...theme, sidenav: value });
    },
    sidebarVisibility: () => {
      setTheme({ ...theme, sidebarVisibility: !theme.sidebarVisibility });
    },
    sidebarHide: () => {
      setTheme({ ...theme, sidebarVisibility: false });
    },
    header: (value: "white" | "light" | "dark" | "theme") => {
      setTheme({ ...theme, header: value });
    },
    skin: (value: "light" | "dark") => {
      setTheme({ ...theme, skin: value });
    },
    reset: () => {
      setTheme({
        ...theme,
        main: defaultTheme.main,
        sidebar: defaultTheme.sidebar,
        sidenav: defaultTheme.sidenav,
        skin: defaultTheme.skin,
      });
    },
  };

  const bodyClass = classNames({
    "nk-body ui-rounder has-sidebar has-touch nk-nio-theme": true,
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.className = bodyClass;
    }
  }, [bodyClass]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme.main === "default") {
        body.classList.add("ui-default");
        body.classList.remove("ui-softy");
      }
      if (theme.main === "softy") {
        body.classList.add("ui-softy");
        body.classList.remove("ui-default");
      }
      if (theme.skin === "dark") {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
      if (theme.sidebarVisibility) {
        body.classList.add("nav-shown");
      } else {
        body.classList.remove("nav-shown");
      }
    }
  }, [theme]);

  // useEffect(() => {
  //   const handleMobileSidebar = () => {
  //     if (window.innerWidth < 1200) {
  //       setTheme({ ...theme, sidebarMobile: true });
  //     } else {
  //       setTheme({ ...theme, sidebarMobile: false, sidebarVisibility: false });
  //     }
  //   };

  //   handleMobileSidebar();
  //   window.addEventListener("resize", handleMobileSidebar);
  //   return () => {
  //     window.removeEventListener("resize", handleMobileSidebar);
  //   };
  // }, [theme]);

  // useEffect(() => {
  //   const handleMobileSidebar = () => {
  //     setTheme((prevTheme) => ({
  //       ...prevTheme,
  //       sidebarMobile: window.innerWidth < 1200,
  //       ...(window.innerWidth >= 1200 ? { sidebarVisibility: false } : {}),
  //     }));
  //   };

  //   handleMobileSidebar();
  //   window.addEventListener("resize", handleMobileSidebar);
  //   return () => {
  //     window.removeEventListener("resize", handleMobileSidebar);
  //   };
  // }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMobileSidebar = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setTheme((prevTheme) => ({
          ...prevTheme,
          sidebarMobile: window.innerWidth < 1200,
          ...(window.innerWidth >= 1200 ? { sidebarVisibility: false } : {}),
        }));
      }, 300);
    };

    handleMobileSidebar();
    window.addEventListener("resize", handleMobileSidebar);
    return () => {
      window.removeEventListener("resize", handleMobileSidebar);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={themeUpdate}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
