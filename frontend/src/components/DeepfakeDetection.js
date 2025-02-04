import React, { useState } from 'react';
import { Container, Paper, Button, LinearProgress, Typography } from '@mui/material';

const DeepfakeDetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch('/api/deepfake-detection', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error("Upload error:", err);
    }
    setUploading(false);
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Paper style={{ padding: 20 }}>
        <h2>Deepfake Detection Module</h2>
        <input type="file" onChange={handleFileChange} accept="video/*,image/*" />
        <Button variant="contained" onClick={handleUpload} disabled={uploading} style={{ marginTop: 10 }}>
          {uploading ? "Uploading..." : "Analyze File"}
        </Button>
        {uploading && <LinearProgress style={{ marginTop: 10 }} />}
        {result && (
          <Typography variant="body1" style={{ marginTop: 10 }}>
            Confidence: {result.confidence.toFixed(2)} - {result.flagged ? "Flagged as Deepfake" : "Authentic"}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default DeepfakeDetection;
