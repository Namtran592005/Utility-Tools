// src/components/Home/Home.js
import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion'; // Import framer-motion
import styles from './Home.module.css'; // Import CSS Modules
// Import icon
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import PercentIcon from '@mui/icons-material/Percent';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import InfoIcon from '@mui/icons-material/Info';

const tools = [
    { name: 'nav.unitConverter', path: '/unit-converter', icon: <CalculateIcon fontSize="large" /> },
    { name: 'nav.currencyConverter', path: '/currency-converter', icon: <CurrencyExchangeIcon fontSize="large" /> },
    { name: 'nav.qrCodeGenerator', path: '/qrcode-generator', icon: <QrCode2Icon fontSize="large" /> },
    { name: 'nav.passwordChecker', path: '/password-checker', icon: <SecurityIcon fontSize="large" /> },
    { name: 'nav.passwordGenerator', path: '/password-generator', icon: <KeyIcon fontSize="large" /> },
    { name: 'nav.interestCalculator', path: '/interest-calculator', icon: <PercentIcon fontSize="large" /> },
    { name: 'nav.bmiCalculator', path: '/bmi-calculator', icon: <MonitorWeightIcon fontSize="large" /> },
    { name: 'nav.about', path: '/about', icon: <InfoIcon fontSize="large"/>}
];

// Animation variants
const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

function Home() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom align="center" className={styles.title}>
                <FormattedMessage id="home.welcome" />
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" className={styles.subtitle}>
                <FormattedMessage id="home.description" />
            </Typography>
            <Grid container spacing={3} justifyContent="center" >
                {tools.map((tool) => (
                    <Grid item  xs={12} sm={6} md={4} key={tool.path}
                          component={motion.div}
                          initial="offscreen"
                          whileInView="onscreen"
                          viewport={{ once: true, amount: 0.5 }} // Trigger animation once, when 50% visible
                          variants={cardVariants}
                    >
                        <Card className={styles.card}>
                            <CardActionArea component={Link} to={tool.path}>
                                <CardContent>
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        {tool.icon}
                                    </Box>
                                    <Typography variant="h6" component="div" align="center">
                                        <FormattedMessage id={tool.name} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;