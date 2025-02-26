import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Checkbox, FormControlLabel, Slider, Tooltip, Box } from '@mui/material';
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import copy from 'copy-to-clipboard';
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
const checkboxVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.2,
    },
  },
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

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [copied, setCopied] = useState(false);


    const generatePassword = () => {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let validChars = '';
        if (includeUppercase) validChars += uppercaseChars;
        if (includeLowercase) validChars += lowercaseChars;
        if (includeNumbers) validChars += numberChars;
        if (includeSymbols) validChars += symbolChars;

        if (validChars.length === 0) {
          alert(<FormattedMessage id="passwordGenerator.selectChars"/>); // Or use a Material UI Alert

            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            generatedPassword += validChars[randomIndex];
        }
        setPassword(generatedPassword);
        setCopied(false); // Reset copied state on generate
    };

    const handleCopy = () => {
        // setCopied(true);
        // setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        copy(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);

    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                <FormattedMessage id="passwordGenerator.title"/>
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <Box display="flex" alignItems="center">
                      <TextField
                        label={<FormattedMessage id="passwordGenerator.generatedPassword"/>}
                        value={password}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                        <Tooltip title={copied ? <FormattedMessage id="passwordGenerator.copied"/> : <FormattedMessage id="passwordGenerator.copy"/>} placement="top">
                            <Button variant='outlined' sx={{ ml: 2 }} onClick={handleCopy}><FormattedMessage id="passwordGenerator.copy"/></Button>
                        </Tooltip>


                    </Box>


                </Grid>
                <Grid item xs={12}>
                    <Typography id="length-slider" gutterBottom>
                       <FormattedMessage id="passwordGenerator.length"/>: {length}
                    </Typography>
                    <Slider
                        value={length}
                        onChange={(e, newValue) => setLength(newValue)}
                        aria-labelledby="length-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={4}
                        max={32}
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={checkboxVariants} initial="hidden" animate="visible">
                    <FormControlLabel
                        control={<Checkbox checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />}
                        label={<FormattedMessage id="passwordGenerator.uppercase"/>}
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={checkboxVariants} initial="hidden" animate="visible">
                    <FormControlLabel
                        control={<Checkbox checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />}
                        label={<FormattedMessage id="passwordGenerator.lowercase"/>}
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={checkboxVariants} initial="hidden" animate="visible">
                    <FormControlLabel
                        control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />}
                        label={<FormattedMessage id="passwordGenerator.numbers"/>}
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={checkboxVariants} initial="hidden" animate="visible">
                    <FormControlLabel
                        control={<Checkbox checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />}
                        label={<FormattedMessage id="passwordGenerator.symbols"/>}
                    />
                </Grid>
                <Grid item xs={12} component={motion.div} variants={buttonVariants} initial="hidden" animate="visible"whileHover="hover">
                    <Button variant="contained" onClick={generatePassword}>
                        <FormattedMessage id="passwordGenerator.generateButton"/>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
export default PasswordGenerator;