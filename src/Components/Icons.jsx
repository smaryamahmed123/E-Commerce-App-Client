import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#002f34',

    }
  });

const HeartRating = () => {
  return (
    <Box>
      <StyledRating
        icon={<FavoriteIcon />}
        emptyIcon={<FavoriteIcon/>}
        max={1}             
      />
    </Box>
  );
};


const labels = {
  0.5: '',
  1: '',
  1.5: '',
  2: '',
  2.5: '',
  3: '',
  3.5: '',
  4: '',
  4.5: 'Excellent',
  5: '',
};

function TextRating() {
  const value = 3.5;

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
}



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function CustomizedBadges() {
  // Accessing the counter from the state (if needed)
  const counter = useSelector(state => state.counter.counter);

  // Accessing the cart state
  const cart = useSelector(state => state.cart); // Use the correct slice name

  console.log("Cart in navbar: ", cart);

  return (
    <Badge badgeContent={cart.items.length} color="error">
      <StyledBadge style={{ color: "white" }}>
        <ShoppingCartIcon />
      </StyledBadge>
    </Badge>
  );
}

export  {HeartRating, TextRating,CustomizedBadges };
