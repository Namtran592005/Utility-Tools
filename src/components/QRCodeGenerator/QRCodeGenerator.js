import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Sửa lại import
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
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

function QRCodeGenerator() {
    const [text, setText] = useState('');
    const [download, setDownload] = useState(false);

    const handleGenerate = () => {
        setDownload(true);
        setTimeout(() => setDownload(false), 100);
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                <FormattedMessage id="qrCodeGenerator.title" />
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8} component={motion.div} variants={inputVariants} initial="hidden" animate="visible">
                    <TextField
                        label={<FormattedMessage id="qrCodeGenerator.enterText" />}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4} component={motion.div} variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover">
                    <Button variant="contained" onClick={handleGenerate}>
                        <FormattedMessage id="qrCodeGenerator.generate" />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {text && (
                        <Box display="flex" justifyContent="center">
                            <QRCodeCanvas  // Sử dụng QRCodeCanvas
                                value={text}
                                size={256}
                                level="H"
                                id="qr-code"
                            />
                        </Box>
                    )}
                    {text && download && (
                        <Box display="flex" justifyContent="center" mt={2}>
                            <a
                                href={document.getElementById('qr-code')?.toDataURL("image/png")}
                                download="qrcode.png"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button variant="contained" color="primary">
                                    <FormattedMessage id="qrCodeGenerator.download" />
                                </Button>
                            </a>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default QRCodeGenerator;