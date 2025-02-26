
import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Grid, Typography, FormControl, InputLabel } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import styles from './UnitConverter.module.css';

const units = {
    length: [
        { label: 'unitConverter.meter', value: 'm' }, // Sử dụng key cho FormattedMessage
        { label: 'unitConverter.kilometer', value: 'km' },
        { label: 'unitConverter.centimeter', value: 'cm' },
        { label: 'unitConverter.millimeter', value: 'mm' },
        { label: 'unitConverter.foot', value: 'ft' },
        { label: 'unitConverter.inch', value: 'in' },
    ],
    weight: [
        { label: 'unitConverter.gram', value: 'g' },
        { label: 'unitConverter.kilogram', value: 'kg' },
        { label: 'unitConverter.pound', value: 'lb' },
        { label: 'unitConverter.ounce', value: 'oz' },
    ],
    temperature: [
        { label: 'unitConverter.celsius', value: 'celsius' },
        { label: 'unitConverter.fahrenheit', value: 'fahrenheit' },
        { label: 'unitConverter.kelvin', value: 'kelvin' },
    ],
    volume: [
        { label: 'unitConverter.liter', value: 'l' },
        { label: 'unitConverter.milliliter', value: 'ml' },
        { label: 'unitConverter.gallon', value: 'gal' },
        { label: 'unitConverter.quart', value: 'qt' },
    ],
};


const conversions = {
    m: { km: 0.001, cm: 100, mm: 1000, ft: 3.28084, in: 39.3701 },
    km: { m: 1000, cm: 100000, mm: 1000000, ft: 3280.84, in: 39370.1 },
    cm: { m: 0.01, km: 0.00001, mm: 10, ft: 0.0328084, in: 0.393701 },
    mm: { m: 0.001, km: 0.000001, cm: 0.1, ft: 0.00328084, in: 0.0393701 },
    ft: { m: 0.3048, km: 0.0003048, cm: 30.48, mm: 304.8, in: 12 },
    in: { m: 0.0254, km: 0.0000254, cm: 2.54, mm: 25.4, ft: 0.0833333 },
    g: { kg: 0.001, lb: 0.00220462, oz: 0.035274 },
    kg: { g: 1000, lb: 2.20462, oz: 35.274 },
    lb: { g: 453.592, kg: 0.453592, oz: 16 },
    oz: { g: 28.3495, kg: 0.0283495, lb: 0.0625 },
    celsius: {
        fahrenheit: (c) => c * 9 / 5 + 32,
        kelvin: (c) => c + 273.15
    },
    fahrenheit: {
        celsius: (f) => (f - 32) * 5 / 9,
        kelvin: (f) => (f - 32) * 5 / 9 + 273.15
    },
    kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9 / 5 + 32
    },
    l: { ml: 1000, gal: 0.264172, qt: 1.05669 },
    ml: { l: 0.001, gal: 0.000264172, qt: 0.00105669 },
    gal: { l: 3.78541, ml: 3785.41, qt: 4 },
    qt: { l: 0.946353, ml: 946.353, gal: 0.25 },
};

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
        scale: 1.1, // Phóng to 110%
        transition: {
            duration: 0.3, // Thời gian 0.3 giây
            yoyo: Infinity // Lặp lại vô hạn (phóng to thu nhỏ)
        }
    }
};


function UnitConverter() {
    const [unitType, setUnitType] = useState('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('km');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const convert = () => {
        setErrorMessage(''); // Reset error message
        const inputValueNum = parseFloat(inputValue);

        if (isNaN(inputValueNum)) {
            setErrorMessage(<FormattedMessage id="unitConverter.invalidNumber" />);
            setOutputValue('');
            return;
        }

        if (units[unitType].every(unit => unit.value !== fromUnit) || units[unitType].every(unit => unit.value !== toUnit)) {
            setErrorMessage(<FormattedMessage id="unitConverter.invalidUnit" />);
            setOutputValue('');
            return;
        }

        let result;

        if (unitType === 'temperature') {
            if (conversions[fromUnit] && typeof conversions[fromUnit][toUnit] === 'function') {
                result = conversions[fromUnit][toUnit](inputValueNum);
            } else {
                setErrorMessage(<FormattedMessage id="unitConverter.invalidConversion" />);
                setOutputValue("");
                return;
            }
        } else {

            if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
                result = inputValueNum * conversions[fromUnit][toUnit];
            } else {
                setErrorMessage(<FormattedMessage id="unitConverter.invalidConversion" />);
                setOutputValue('');
                return;
            }
        }

        setOutputValue(result.toFixed(2));

    };


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                <FormattedMessage id="unitConverter.title" />
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} component={motion.div} variants={selectVariants} initial="hidden" animate="visible">
                    <FormControl fullWidth>
                        <InputLabel><FormattedMessage id="unitConverter.unitType" /></InputLabel>
                        <Select
                            value={unitType}
                            onChange={(e) => { setUnitType(e.target.value); setFromUnit(units[e.target.value][0].value); setToUnit(units[e.target.value][1].value); }}
                            label={<FormattedMessage id="unitConverter.unitType" />}
                        >
                            {Object.keys(units).map((type) => (
                                <MenuItem key={type} value={type}><FormattedMessage id={`unitConverter.${type}`} /></MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="unitConverter.from" />}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        type="text"
                        error={!!errorMessage} // Show error state
                        helperText={errorMessage}
                        className={styles.inputField}

                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel><FormattedMessage id="unitConverter.from" /></InputLabel>
                        <Select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            label={<FormattedMessage id="unitConverter.from" />}

                        >
                            {units[unitType].map((unit) => (
                                <MenuItem key={unit.value} value={unit.value}>
                                    <FormattedMessage id={unit.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="unitConverter.to" />}
                        value={outputValue}
                        fullWidth
                        disabled
                        className={styles.inputField}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel><FormattedMessage id="unitConverter.to" /></InputLabel>
                        <Select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            label={<FormattedMessage id="unitConverter.to" />}
                        >
                            {units[unitType].map((unit) => (
                                  <MenuItem key={unit.value} value={unit.value}>
                                    <FormattedMessage id={unit.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} component={motion.div} variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover">
                    <Button variant="contained" onClick={convert}>
                        <FormattedMessage id="unitConverter.convert" />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UnitConverter;