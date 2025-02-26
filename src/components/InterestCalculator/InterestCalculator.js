import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120, // Độ cứng của lò xo
            damping: 10,     // Độ giảm chấn
            delay: 0.1     // Trì hoãn 0.2 giây
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
function InterestCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [interestType, setInterestType] = useState('simple'); // 'simple' or 'compound'
    const [compoundFrequency, setCompoundFrequency] = useState(1); // Annually
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const calculateInterest = () => {
        setError(''); // Clear previous errors
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;  // Convert percentage to decimal
        const t = parseFloat(time);

        if (isNaN(p) || isNaN(r) || isNaN(t)) {
            setError(<FormattedMessage id="interestCalculator.invalidInput" />);
            setResult('');
            return;
        }

        if (p <= 0 || r <= 0 || t <= 0) {
            setError(<FormattedMessage id="interestCalculator.greaterThanZero" />);
            setResult('');
            return;
        }


        let finalAmount;
        if (interestType === 'simple') {
            finalAmount = p * (1 + r * t);
        } else { // Compound
            const n = compoundFrequency;
            finalAmount = p * Math.pow(1 + (r / n), n * t);
        }
        setResult(finalAmount.toFixed(2));

    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                <FormattedMessage id="interestCalculator.title" />
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="interestCalculator.principal" />}
                        type="text"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        fullWidth
                        error={!!error}
                    />
                </Grid>
                <Grid item xs={12} sm={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="interestCalculator.rate" />}
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        fullWidth
                        error={!!error}
                    />
                </Grid>
                <Grid item xs={12} sm={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="interestCalculator.time" />}
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        fullWidth
                        error={!!error}
                    />
                </Grid>
                <Grid item xs={12} sm={6} component={motion.div} variants={selectVariants} initial="hidden" animate="visible">
                    <FormControl fullWidth>
                        <InputLabel><FormattedMessage id="interestCalculator.interestType" /></InputLabel>
                        <Select
                            value={interestType}
                            onChange={(e) => setInterestType(e.target.value)}
                            label={<FormattedMessage id="interestCalculator.interestType" />}
                        >
                            <MenuItem value="simple"><FormattedMessage id="interestCalculator.simple" /></MenuItem>
                            <MenuItem value="compound"><FormattedMessage id="interestCalculator.compound" /></MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {interestType === 'compound' && (
                    <Grid item xs={12} sm={6} component={motion.div} variants={selectVariants} initial="hidden" animate="visible">
                        <FormControl fullWidth>
                            <InputLabel><FormattedMessage id="interestCalculator.frequency" /></InputLabel>
                            <Select
                                value={compoundFrequency}
                                onChange={(e) => setCompoundFrequency(parseInt(e.target.value, 10))}
                                label={<FormattedMessage id="interestCalculator.frequency" />}
                            >
                                <MenuItem value={1}><FormattedMessage id="interestCalculator.annually" /></MenuItem>
                                <MenuItem value={2}><FormattedMessage id="interestCalculator.semiannually" /></MenuItem>
                                <MenuItem value={4}><FormattedMessage id="interestCalculator.quarterly" /></MenuItem>
                                <MenuItem value={12}><FormattedMessage id="interestCalculator.monthly" /></MenuItem>
                                <MenuItem value={365}><FormattedMessage id="interestCalculator.daily" /></MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                <Grid item xs={12} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="interestCalculator.finalAmount" />}
                        value={result}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover">
                    <Button variant="contained" onClick={calculateInterest}>
                        <FormattedMessage id="interestCalculator.calculate" />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default InterestCalculator;