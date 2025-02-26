import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocale } from '../../contexts/LocaleContext';
import { FormattedMessage } from 'react-intl';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icon mặt trăng (dark mode)
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icon mặt trời (light mode)
import TranslateIcon from '@mui/icons-material/Translate';

// Import các icon cho các công cụ (bạn có thể thay đổi icon theo ý thích)
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import PercentIcon from '@mui/icons-material/Percent';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import InfoIcon from '@mui/icons-material/Info';

const tools = [
  { name: 'nav.unitConverter', path: '/unit-converter', icon: <CalculateIcon /> },
  { name: 'nav.currencyConverter', path: '/currency-converter', icon: <CurrencyExchangeIcon /> },
  { name: 'nav.qrCodeGenerator', path: '/qrcode-generator', icon: <QrCode2Icon /> },
  { name: 'nav.passwordChecker', path: '/password-checker', icon: <SecurityIcon /> },
  { name: 'nav.passwordGenerator', path: '/password-generator', icon: <KeyIcon /> },
  { name: 'nav.interestCalculator', path: '/interest-calculator', icon: <PercentIcon /> },
  { name: 'nav.bmiCalculator', path: '/bmi-calculator', icon: <MonitorWeightIcon /> },
  { name: 'nav.about', path: '/about', icon: <InfoIcon /> },
];

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { locale, changeLocale } = useLocale();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode
          ? 'var(--header-bg-color-dark)'
          : 'var(--header-bg-color-light)',
        color: isDarkMode
          ? 'var(--header-text-color-dark)'
          : 'var(--header-text-color-light)',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <FormattedMessage id="app.title" />
        </Typography>

        {/* Nút chuyển đổi ngôn ngữ */}
        <IconButton
          color="inherit"
          onClick={() => changeLocale(locale === 'en' ? 'vi' : 'en')}
          aria-label={
            locale === 'en' ? 'Switch to Vietnamese' : 'Switch to English'
          }
        >
          <TranslateIcon />
        </IconButton>

        {/* Nút chuyển đổi theme (chỉ dùng icon) */}
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>

      {/* Drawer (danh sách trượt ra) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {tools.map((tool) => (
              <ListItem key={tool.path} disablePadding>
                <ListItemButton component={Link} to={tool.path}>
                  <ListItemIcon>{tool.icon}</ListItemIcon>
                  <ListItemText primary={<FormattedMessage id={tool.name} />} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;