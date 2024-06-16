import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
