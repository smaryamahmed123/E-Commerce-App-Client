import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import DetailedPg from './Pages/DetailedPg';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import Login from './Pages/LogIn';
import Profile from './Pages/Profile';
import OrderHistory from './Pages/OrderHistory';
import Wishlist from './Pages/Wishlist';
import AdminDashboard from './Pages/AdminDashboard';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import FAQ from './Pages/FAQ';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Blog from './Pages/Blog';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import SignUp from './Pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useEffect } from 'react';
import { loginSuccess } from './store/slices/AuthSlice';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import SearchResults from './Pages/SearchResults';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Images for the carousel
import image1 from './assets/img4.jpeg';
import image2 from './assets/img8.png';
import image3 from './assets/img9.png';
import AdminRequestForm from './Pages/AdminRequestForm';
import OrderDetailed from './Pages/OrderDetailed';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(loginSuccess({ user, token }));
    }
  }, [dispatch]);

  return (
    <> {/* Initialize auth state */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ marginTop: '70px' }}>
          {/* <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            interval={2000}
            showStatus={false}
            dynamicHeight={false}
            style={{ height: '400px' }}
          >
            <div>
              <img src={image1} alt="Slide 1" style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
              <p className="legend">Caption for Slide 1</p>
            </div>
            <div>
              <img src={image2} alt="Slide 2" style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
              <p className="legend">Caption for Slide 2</p>
            </div>
            <div>
              <img src={image3} alt="Slide 3" style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
              <p className="legend">Caption for Slide 3</p>
            </div>
          </Carousel> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<DetailedPg />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order/:id" element={<OrderDetailed />} />
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/sign-up" element={<PublicRoute />}>
              <Route path="/sign-up" element={<SignUp />} /> {/* Add your SignUp component here */}
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route index element={<Profile />} />  {/* default route for "/profile" */}
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute isAdminRoute={true} />}>
              <Route index element={<AdminDashboard />} />
                <Route path="admin-request" element={<AdminRequestForm />} />
            </Route>
          
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Box>
        <Footer />
      </ThemeProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  )
}

export default App;
