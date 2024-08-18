import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputBase, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/AuthSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountMenu from './AccountMenu';
const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery('(max-width:700px)');
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/shop", text: "Shop" },
    { to: "/about-us", text: "About Us" },
    { to: "/contact-us", text: "Contact Us" },
    { to: "/faq", text: "FAQ" },
    { to: "/terms-and-conditions", text: "Terms & Conditions" },
    { to: "/privacy-policy", text: "Privacy Policy" },
    { to: "/blog", text: "Blog" },
  ];

  const privateLinks = [
    { to: "/cart", text: <ShoppingCartIcon /> },
    { to: "/profile/order-history", text: "Order History" }
  ];

  const authLinks = [
    { to: "/login", text: "Login" },
    { to: "/sign-up", text: "Register" },
  ];

  const allLinks = navLinks.concat(isAuthenticated ? privateLinks : authLinks);

  return (
    <Stack sx={{ display: 'flex' }}>
      <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0d3b66' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src="/logo.jpeg" sx={{ flexShrink: 0, marginRight: 5 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, whiteSpace: 'nowrap' }}>
            E-Commerce App
          </Typography>
          {!isSmallScreen && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
              />
            </Search>
          )}
           <AccountMenu />
        </Toolbar>
      </MuiAppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#0d3b66',
            color: '#faf0ca',
          },
        }}
      >
        <Stack direction="column" spacing={2} sx={{ m: 2 }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ alignSelf: 'flex-end' }}
          >
            <CloseIcon sx={{ color: '#faf0ca' }} />
          </IconButton>
          {isSmallScreen && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
              />
            </Search>
          )}
          {allLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: 'none',
                color: '#faf0ca',
                fontWeight: 'inherit',
                fontSize: 16,
              }}
            >
              {link.text}
            </Link>
          ))}
          {isAuthenticated && user?.role === 'admin' && (
           <>
            <Link
              to="/admin"
              style={{
                textDecoration: 'none',
                color: '#faf0ca',
                fontWeight: 'inherit',
                fontSize: 16,
              }}
            >
              Admin Dashboard
            </Link>
               <Link
               to="/admin/admin-request"
               style={{
                 textDecoration: 'none',
                 color: '#faf0ca',
                 fontWeight: 'inherit',
                 fontSize: 16,
               }}
             >
               Admin Request
             </Link>
           </>
          )}
          {/* {isAuthenticated && (
            <Button color="inherit" sx={{ textAlign: 'start' }} onClick={handleLogout}>
              Logout
            </Button>
          )} */}
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default Navbar;
