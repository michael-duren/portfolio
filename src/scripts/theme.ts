import { theme } from "../store/store";

export type Theme = "light" | "dark" | "system";

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const getResolvedTheme = (themePreference: Theme): "light" | "dark" => {
  if (themePreference === "system") {
    return getSystemTheme();
  }
  return themePreference;
};

export const applyTheme = (themePreference: Theme) => {
  const resolvedTheme = getResolvedTheme(themePreference);
  const html = document.documentElement;

  if (resolvedTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  html.setAttribute("data-theme", resolvedTheme);
};

export const initTheme = () => {
  const currentTheme = theme.get();
  applyTheme(currentTheme);

  theme.listen((newTheme) => {
    applyTheme(newTheme);
  });

  if (typeof window !== "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (theme.get() === "system") {
        applyTheme("system");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }
};

export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
};

export const getTheme = (): Theme => {
  return theme.get();
};

export const getCurrentTheme = (): "light" | "dark" => {
  return getResolvedTheme(theme.get());
};
