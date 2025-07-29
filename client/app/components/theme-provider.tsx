import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";

// Types
type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// Context default
const ThemeProviderContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isClient, setIsClient] = useState(false);

  // On mount: detect client and load saved theme
  useEffect(() => {
    setIsClient(true);

    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    } catch (err) {
      console.error("ThemeProvider: localStorage read failed", err);
    }
  }, [storageKey]);

  // Sync theme to <html> + localStorage
  useEffect(() => {
    if (!isClient) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const applied =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(applied);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {
      console.error("ThemeProvider: localStorage write failed", err);
    }
  }, [theme, isClient, storageKey]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook
export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
