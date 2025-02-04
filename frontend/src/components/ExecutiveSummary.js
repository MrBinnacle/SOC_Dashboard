import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ExecutiveSummary = () => (
  <Card style={{ margin: 20 }}>
    <CardContent>
      <Typography variant="h5">Executive Summary</Typography>
      <Typography variant="body2">
        Key business metrics, ROI, and compliance status.
      </Typography>
    </CardContent>
  </Card>
);

export default ExecutiveSummary;
