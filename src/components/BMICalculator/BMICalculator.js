import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

// ... (các variants animation - giữ nguyên)
const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 120, // Độ cứng của lò xo
      damping: 10, // Độ giảm chấn
      delay: 0.1, // Trì hoãn 0.2 giây
    },
  },
};
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const alertVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
    },
  },
};

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    setError('');
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Chuyển cm sang m

    if (isNaN(weightNum) || isNaN(heightNum)) {
      setError(<FormattedMessage id="bmiCalculator.invalidInput" />);
      setBMI('');
      return;
    }
    if (weightNum <= 0 || heightNum <= 0) {
      setError(<FormattedMessage id="bmiCalculator.greaterThanZero" />);
      setBMI('');
      return;
    }

    // BMI = weight (kg) / (height (m) * height (m))
    const bmiValue = weightNum / (heightNum * heightNum);
    setBMI(bmiValue.toFixed(1));
  };

  const getBMICategory = (bmiValue) => {
    if (!bmiValue) return '';
    const bmi = parseFloat(bmiValue);
    if (bmi < 18.5) return <FormattedMessage id="bmiCalculator.underweight" />;
    if (bmi < 25) return <FormattedMessage id="bmiCalculator.normal" />;
    if (bmi < 30) return <FormattedMessage id="bmiCalculator.overweight" />;
    return <FormattedMessage id="bmiCalculator.obese" />;
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="bmiCalculator.title" />
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          component={motion.div}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <TextField
            label={<FormattedMessage id="bmiCalculator.weight" values={{ unit: 'kg' }}/>}
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            error={!!error}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          component={motion.div}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <TextField
            label={<FormattedMessage id="bmiCalculator.height" values={{ unit: 'cm' }}/>}
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
            error={!!error}
          />
        </Grid>
        <Grid
          item
          xs={12}
          component={motion.div}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Button variant="contained" onClick={calculateBMI}>
            <FormattedMessage id="bmiCalculator.calculate" />
          </Button>
        </Grid>
        {bmi && (
          <Grid
            item
            xs={12}
            component={motion.div}
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert severity="info">
              <FormattedMessage id="bmiCalculator.bmi" />: {bmi} -{' '}
              {getBMICategory(bmi)}
            </Alert>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default BMICalculator;