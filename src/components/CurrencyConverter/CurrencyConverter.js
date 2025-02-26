import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Button, Grid, Typography, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { getExchangeRates } from '../../services/api';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';


const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
      opacity: 1,
      x: 0,
      transition: {
          type: "spring",
          stiffness: 120,
          damping: 10,
          delay: 0.1
      }
  }
};

const selectVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
      opacity: 1,
      y: 0,
      transition: {
          type: "spring",
          stiffness: 100,
          delay: 0.2
      }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
      opacity: 1,
      scale: 1,
      transition: {
          type: "spring",
          stiffness: 150,
          delay: 0.4
      }
  },
  hover: {
      scale: 1.1,
      transition: {
          duration: 0.3,
          yoyo: Infinity
      }
  }
};

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      setError('');
      try {
        const rates = await getExchangeRates('USD'); // Lấy tỷ giá so với USD
        setCurrencies(Object.keys(rates));
      } catch (err) {
        setError(<FormattedMessage id="currencyConverter.fetchError" />);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  const convert = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum)) {
      setError(<FormattedMessage id="currencyConverter.invalidAmount" />);
      setConvertedAmount('');
      setLoading(false);
      return;
    }


    try {
      const rates = await getExchangeRates(fromCurrency);
      if (rates && rates[toCurrency]) {
        setConvertedAmount((amountNum * rates[toCurrency]).toFixed(2));
      } else {
        setError(<FormattedMessage id="currencyConverter.rateNotAvailable" />);
        setConvertedAmount('');
      }
    } catch (err) {
      setError(<FormattedMessage id="currencyConverter.convertError" />);
      setConvertedAmount('');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="currencyConverter.title" />
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Grid container spacing={2}>
          <Grid item xs={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
            <TextField
              label={<FormattedMessage id="currencyConverter.amount" />}
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              error={!!error}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel><FormattedMessage id="currencyConverter.fromCurrency" /></InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                label={<FormattedMessage id="currencyConverter.fromCurrency" />}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
            <TextField
              label={<FormattedMessage id="currencyConverter.convertedAmount" />}
              value={convertedAmount}
              fullWidth
              disabled
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel><FormattedMessage id="currencyConverter.toCurrency" /></InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                label={<FormattedMessage id="currencyConverter.toCurrency" />}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} component={motion.div} variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover">
            <Button variant="contained" onClick={convert} disabled={loading}>
              <FormattedMessage id="currencyConverter.convert" />
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default CurrencyConverter;