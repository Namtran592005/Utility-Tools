import React from 'react';
import {Typography, Paper, Box} from '@mui/material';
import {FormattedMessage} from 'react-intl';
import styles from './About.module.css'; // Import CSS Modules file

function About() {
    return (
       <Box p={3}>
           <Paper elevation={3} className={styles.container}>
               <Typography variant="h4" gutterBottom className={styles.title}>
                   <FormattedMessage id="about.title"/>
               </Typography>
               <Typography variant="body1" paragraph className={styles.content}>
                   <FormattedMessage id="about.content"/>
               </Typography>
           </Paper>
       </Box>
    );
};
export default About;