import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, TextField, Button } from '@mui/material';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const ThreatPrioritization = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    severity: '',
    timestamp: '',
    affectedSystem: ''
  });

  useEffect(() => {
    // Fetch threat data (this demo assumes backend returns properly formatted data)
    fetch('/api/threat-prioritization')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching threat data:", err));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    // In production, send filter parameters to backend API
    console.log("Applying filters:", filters);
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Paper style={{ padding: 20 }}>
        <h2>Threat Prioritization Heatmap</h2>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Severity"
              name="severity"
              value={filters.severity}
              onChange={handleFilterChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Timestamp"
              name="timestamp"
              value={filters.timestamp}
              onChange={handleFilterChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Affected System"
              name="affectedSystem"
              value={filters.affectedSystem}
              onChange={handleFilterChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
        <div style={{ height: 400, marginTop: 20 }}>
          <ResponsiveHeatMap
            data={data}
            keys={["risk_score"]}
            indexBy="event_id"
            margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ThreatPrioritization;
