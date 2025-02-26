// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline,  createTheme, ThemeProvider, Container } from '@mui/material';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext'; // Đổi tên ThemeProvider
import { LocaleProvider } from './contexts/LocaleContext';

import Home from './components/Home/Home';  // Thay đổi đường dẫn
import UnitConverter from './components/UnitConverter/UnitConverter';  // Thay đổi đường dẫn
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import PasswordChecker from './components/PasswordChecker/PasswordChecker';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';
import InterestCalculator from './components/InterestCalculator/InterestCalculator';
import BMICalculator from './components/BMICalculator/BMICalculator';
import { Header, Footer } from './components/Layout'; // Import từ Layout/index.js
import About from "./components/About/About";

// Tạo theme bên ngoài component App để tránh re-render không cần thiết
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Màu xanh dương
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#fff', // Màu nền trắng
            paper: '#fff',
        },
        text: {
            primary: '#000',
            secondary: '#5f6368',
        }

    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Xanh dương nhạt hơn
        },
        secondary: {
            main: '#f48fb1', // Hồng nhạt hơn
        },
        background: {
            default: '#121212', // Màu nền tối
            paper: '#1e1e1e',
        },
        text: {
            primary: '#fff',
            secondary: '#ccc',
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});



function App() {

  return (
      <CustomThemeProvider>
          <LocaleProvider>
            <AppContent />
          </LocaleProvider>
      </CustomThemeProvider>
  );
}

function AppContent(){
    const { isDarkMode } = useTheme();
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL}>
                <Header />
                <Container sx={{ py: 4, minHeight: 'calc(100vh - 64px - 64px)'  }} >
                    {/*  minHeight để Footer luôn ở dưới cùng */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/unit-converter" element={<UnitConverter />} />
                        <Route path="/currency-converter" element={<CurrencyConverter />} />
                        <Route path="/qrcode-generator" element={<QRCodeGenerator />} />
                        <Route path="/password-checker" element={<PasswordChecker />} />
                        <Route path="/password-generator" element={<PasswordGenerator />} />
                        <Route path="/interest-calculator" element={<InterestCalculator />} />
                        <Route path="/bmi-calculator" element={<BMICalculator />} />
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </Container>
                <Footer />
            </Router>
        </ThemeProvider>
    )
}

export default App;