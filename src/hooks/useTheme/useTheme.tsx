import useKeyboardShortcut from '../useKeyboardShortcut';
import React from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const KEY = 'mode';

const defaultContextData = {
  dark: false,
  toggleDark: () => {},
};

export const ThemeContext = React.createContext(defaultContextData);

const useTheme = () => React.useContext(ThemeContext);

const storage = {
  get: (init?: Theme) => window.localStorage.getItem(KEY) || init,
  set: (value: Theme) => window.localStorage.setItem(KEY, value),
};

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const useDarkMode = (): [Theme, (theme?: Theme) => void] => {
  const [themeState, setThemeState] = React.useState(Theme.LIGHT);

  const setThemeStateEnhanced = (themeValue?: Theme) => {
    setThemeState((prevState) => {
      const nextState = themeValue
        ? themeValue
        : prevState === Theme.LIGHT
        ? Theme.DARK
        : Theme.LIGHT;

      document.body.classList.remove('c1495616js-' + prevState);
      document.body.classList.add('c1495616js-' + nextState);
      document.documentElement.style.setProperty('color-scheme', nextState);
      storage.set(nextState);

      return nextState;
    });
  };

  React.useEffect(() => {
    const storedMode = storage.get();
    if (!storedMode && supportsDarkMode()) {
      return setThemeStateEnhanced(Theme.DARK);
    }

    if (!storedMode || storedMode === themeState) {
      return;
    }

    setThemeStateEnhanced();
  }, [themeState]);

  return [themeState, setThemeStateEnhanced];
};

/**
 * Regular ThemeProvider
 */
const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [themeState, setThemeStateEnhanced] = useDarkMode();
  const toggleDark = React.useCallback(() => {
    setThemeStateEnhanced();
  }, [setThemeStateEnhanced]);

  useKeyboardShortcut('ctrl+t', toggleDark);

  React.useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        setThemeStateEnhanced(e.matches ? Theme.DARK : Theme.LIGHT);
      });
  }, [setThemeStateEnhanced, toggleDark]);

  return (
    <ThemeContext.Provider
      value={{
        dark: themeState === Theme.LIGHT,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Storybook ThemeProvider
 */
const SbThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [themeClass, setThemeClass] = React.useState<
    'c1495616js-dark' | 'c1495616js-light'
  >('c1495616js-dark');
  const toggleDark = () =>
    setThemeClass((theme) =>
      theme === 'c1495616js-dark' ? 'c1495616js-light' : 'c1495616js-dark'
    );
  const isDark = themeClass === 'c1495616js-dark';
  return (
    <ThemeContext.Provider value={{ dark: isDark, toggleDark }}>
      <div
        className={themeClass}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: isDark ? 'black' : 'white',
          height: '100vh',
          padding: '0.5rem',
        }}
      >
        <button type="button" onClick={toggleDark}>
          Theme: {isDark ? 'dark' : 'light'}
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, SbThemeProvider };
export default useTheme;
