// src/contexts/LocaleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../locales/en.json'; // Import trực tiếp
import viMessages from '../locales/vi.json'; // Import trực tiếp

const LocaleContext = createContext();

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('vi'); // Mặc định là tiếng Việt
  const [messages, setMessages] = useState(viMessages); // Sử dụng viMessages

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
      setMessages(savedLocale === 'en' ? enMessages : viMessages); // Chọn messages
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    setMessages(locale === 'en' ? enMessages : viMessages); // Cập nhật messages
  }, [locale]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};