import { createContext, useContext, ReactNode, useState } from "react";

type TranslationDict = Record<string, string>;

interface I18nContextType {
  dict: TranslationDict;
  setDict: (dict: TranslationDict) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

/**
 * Hook to use translations - provides a simple interface for internationalization
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    // Return a default implementation if no provider is found
    return {
      dict: {},
      setDict: () => {},
      t: (key: string, fallback?: string) => fallback || key,
    };
  }
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
  initialDict?: TranslationDict;
}

/**
 * Provider for internationalization context
 * Optional - component will work without it
 */
export function I18nProvider({ children, initialDict = {} }: I18nProviderProps) {
  const [dict, setDict] = useState<TranslationDict>(initialDict);

  const t = (key: string, fallback?: string) => {
    return dict[key] || fallback || key;
  };

  const value = {
    dict,
    setDict,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}