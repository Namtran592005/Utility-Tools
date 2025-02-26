import React, { useState } from 'react';
import { TextField, Typography, Grid, LinearProgress, Alert } from '@mui/material';
import zxcvbn from 'zxcvbn';

function PasswordChecker() {
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);

    const checkPassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setResult(zxcvbn(newPassword));
    }

    const getScoreColor = (score) => {
        switch (score) {
            case 0: return 'error';
            case 1: return 'error';
            case 2: return 'warning';
            case 3: return 'info';
            case 4: return 'success';
            default: return 'primary';
        }
    }

    return (
        <div>
            <Typography variant='h4' gutterBottom>Password Strength Checker</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Enter Password"
                        type="password"
                        value={password}
                        onChange={checkPassword}
                        fullWidth
                    />
                </Grid>
                {result && (
                    <Grid item xs={12}>
                        <Typography>Score: {result.score} / 4</Typography>
                        <LinearProgress variant="determinate" value={result.score * 25} color={getScoreColor(result.score)} />

                        {result.feedback.warning && <Alert severity="warning" sx={{ mt: 2 }}>{result.feedback.warning}</Alert>}
                        {result.feedback.suggestions.length > 0 && (
                            <Alert severity="info" sx={{ mt: 1 }}>
                                Suggestions: {result.feedback.suggestions.join(' ')}
                            </Alert>
                        )}
                        <Typography sx={{mt: 1}}>Estimated crack time: {result.crack_times_display.offline_slow_hashing_1e4_per_second}</Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
export default PasswordChecker;