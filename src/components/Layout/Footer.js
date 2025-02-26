// src/components/Layout/Footer.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '../../contexts/ThemeContext';

function Footer() {
    const {isDarkMode} = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: isDarkMode ? '#333' : '#eee',
        color: isDarkMode ? '#fff' : '#000'
      }}
    >
        <Typography variant="body2" align="center">
            <FormattedMessage id="footer.copyright" />
        </Typography>
    </Box>
  );
}

export default Footer;