// src/Pages/Login.jsx
import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import { loginStart, loginSuccess, loginFail } from '../../store/slices/AuthSlice.js';
import { BASE_URL1, BASE_URL5 } from '../../Constants/index.jsx';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



function LogIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      if (!credential) {
        throw new Error('Google Credential is missing');
      }
      // const { credential } = response;
      const res = await axios.post(`${BASE_URL1}/auth/google/login`, { tokenId: credential });
      const { user, token } = res.data;
      dispatch(loginSuccess({ user, token }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful', { position: 'top-center' });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google login failed. Please try again.', { position: 'top-center' });
    }
  };

  const handleGoogleFailure = (response) => {
    toast.error('Google login failed. Please try again.', { position: 'top-center' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post(`${BASE_URL5}/login`, { email, password });
      const { user, token } = response.data;
      dispatch(loginSuccess({ user, token }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful', { position: 'top-center' });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data.message || 'An error occurred. Please try again.';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your network connection.';
      } else {
        errorMessage = error.message || 'An error occurred. Please try again.';
      }
      toast.error(errorMessage, { position: 'top-center' });
      dispatch(loginFail(error.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Navbar />
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f4d35e 30%, #f95738 90%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#ee964b',
                '&:hover': {
                  backgroundColor: '#f4d35e',
                },
              }}
            >
              Login
            </Button>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy="single_host_origin"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 2,
                      mb: 2,
                      color: '#fff',
                      borderColor: '#fff',
                      '&:hover': {
                        borderColor: '#ee964b',
                        color: '#ee964b',
                      },
                    }}
                  >
                    Login with Google
                  </Button>
                )}
              />
            </GoogleOAuthProvider>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/sign-up" variant="body2" sx={{ color: '#fff' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default LogIn;
