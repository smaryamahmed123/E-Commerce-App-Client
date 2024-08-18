import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Store/slice/AuthSlice.js';
import axios from 'axios';
import { BASE_URL1 } from '../Constants/index.jsx';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleSignOut = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2.signOut().then(() => {
            console.log('User signed out from Google');
            axios.post(`${BASE_URL1}/auth/logout`)
              .then((response) => {
                console.log('Logout response:', response.data);
                dispatch(logout());
                navigate('/login');
              })
              .catch((error) => {
                console.error('Error during backend logout:', error);
                dispatch(logout());
                navigate('/login');
              });
          });
        } else {
          console.log('Google API not loaded');
          dispatch(logout());
          navigate('/login');
        }
      });
    };
  
    handleGoogleSignOut();
  }, [dispatch, navigate]);
  

  return null; // Optionally, return a loading spinner or message
};

export default LogOut;
