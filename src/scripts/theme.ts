import { theme } from '../store/store';

type Theme = 'light' | 'dark' | 'system';

// Get the system's preferred color scheme
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
};

// Get the resolved theme based on user preference and system settings
const getResolvedTheme = (themePreference: Theme): 'light' | 'dark' => {
  if (themePreference === 'system') {
    return getSystemTheme();
  }
  return themePreference;
};

// Apply the theme to the document
export const applyTheme = (themePreference: Theme) => {
  const resolvedTheme = getResolvedTheme(themePreference);
  const html = document.documentElement;

  // Update Tailwind dark mode class
  if (resolvedTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Update DaisyUI theme
  html.setAttribute('data-theme', resolvedTheme);
};

// Initialize theme on page load
export const initTheme = () => {
  const currentTheme = theme.get();
  applyTheme(currentTheme);

  // Listen for changes to the theme store
  theme.listen((newTheme) => {
    applyTheme(newTheme);
  });

  // Listen for system theme changes when user preference is 'system'
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (theme.get() === 'system') {
        applyTheme('system');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      // Legacy browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }
};

// Set theme preference
export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
};

// Get current theme preference
export const getTheme = (): Theme => {
  return theme.get();
};

// Get the currently applied theme (resolves 'system' to actual theme)
export const getCurrentTheme = (): 'light' | 'dark' => {
  return getResolvedTheme(theme.get());
};
