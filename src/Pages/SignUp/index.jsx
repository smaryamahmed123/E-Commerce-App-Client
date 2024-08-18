import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, InputAdornment, IconButton, Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import { signupStart, signupSuccess, signupFail } from '../../store/slices/AuthSlice.js';
import { BASE_URL1, BASE_URL5 } from '../../Constants/index.jsx';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignUp() {
  // State and navigation hooks
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      if (!credential) {
        throw new Error('Google Credential is missing');
      }
      const res = await axios.post(`${BASE_URL1}/auth/google/signup`, { tokenId: credential });
      const { user, token } = res.data;
      dispatch(signupSuccess({ user, token }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Signup successful', { position: 'top-center' });
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Google signup failed. Please try again.', { position: 'top-center' });
    }
  };

  // Google Sign-In Failure Handler
  const handleGoogleFailure = (response) => {
    toast.error('Google signup failed. Please try again.', { position: 'top-center' });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};

    // First Name validation
    if (!firstName.trim()) tempErrors.firstName = 'First Name is required';

    // Last Name validation
    if (!lastName.trim()) tempErrors.lastName = 'Last Name is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) tempErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) tempErrors.email = 'Email is not valid';

    // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (!password) tempErrors.password = 'Password is required';
    else if (password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    else if (!passwordRegex.test(password)) {
      tempErrors.password = 'Password must include at least one number and one special character';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(signupStart());
      try {
        const response = await axios.post(`${BASE_URL5}/register`, { firstName, lastName, email, password });
        const { user, token } = response.data;
        dispatch(signupSuccess({ user, token }));
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Signup successful', { position: 'top-center' });
        navigate('/', { replace: true });
      } catch (error) {
        let errorMessage;
        if (error.response) {
          errorMessage = error.response.data.message || 'An error occurred. Please try again.';
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your network connection.';
        } else {
          errorMessage = error.message || 'An error occurred. Please try again.';
        }
        toast.error(errorMessage, { position: 'top-center' });
        dispatch(signupFail(error.message));
      }
    } else {
      toast.error('Please fix the validation errors', { position: 'top-center' });
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
          background: 'linear-gradient(135deg, #0d3b66 30%, #f95738 90%)',
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="fname"
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
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
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#f4d35e',
                '&:hover': {
                  backgroundColor: '#ee964b',
                },
              }}
            >
              Sign Up
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
                        borderColor: '#f4d35e',
                        color: '#f4d35e',
                      },
                    }}
                  >
                    Sign Up with Google
                  </Button>
                )}
              />
            </GoogleOAuthProvider>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2" sx={{ color: '#fff' }}>
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;
