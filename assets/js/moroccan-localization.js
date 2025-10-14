(() => {
  try {
    const DEFAULT_LANG = 'fr';

    const getStoredLang = () => {
      const val = localStorage.getItem('grilli-language');
      return val ? val : DEFAULT_LANG;
    };

    const setStoredLang = (lang) => {
      if (!['fr', 'en', 'ar'].includes(lang)) return;
      localStorage.setItem('grilli-language', lang);
    };

    const applyLanguage = (lang) => {
      document.documentElement.setAttribute('lang', lang);
      // Hook for future per-language adjustments (copy, prices, rtl)
      // Currently kept minimal to avoid intrusive changes.
    };

    // Initialize language on load
    const initialLang = getStoredLang();
    applyLanguage(initialLang);

    // Expose a minimal API for future use
    window.GrilliLocalization = {
      setLanguage(lang) {
        setStoredLang(lang);
        applyLanguage(getStoredLang());
      },
      getLanguage() {
        return getStoredLang();
      }
    };

    // Ensure DOM attribute stays in sync after content loads
    document.addEventListener('DOMContentLoaded', () => {
      applyLanguage(getStoredLang());
    });
  } catch (err) {
    console.error('Localization init error:', err);
  }
})();