import React from 'react';
import { Container, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Paper style={{ padding: 20 }}>
        <h2>SOC Dashboard</h2>
        <p>Overview of security metrics and system health.</p>
      </Paper>
    </Container>
  );
};

export default Dashboard;
