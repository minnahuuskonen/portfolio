/**
 * Returns current language based on URL
 *
 * @author Lauri Lukkarinen <Github @lauriLukkarinen>
 */
export const getCurrentLanguage = (currentLocale?: string) =>
  !currentLocale || !["fi", "en"].includes(currentLocale) ? "en" : (currentLocale as "fi" | "en");