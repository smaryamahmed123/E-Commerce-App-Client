import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const preventDefault = (event) => event.preventDefault();

const UnderlineLink = (props) => {
  const { href, label, actionType } = props;

  const handleLinkClick = () => {
    if (actionType === 'call') {
      // Execute call action
      window.location.href = `tel:${href}`;
    } else if (actionType === 'email') {
      // Execute email action
      window.location.href = `mailto:${href}`;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        typography: 'body1',
        '& > :not(style)': {
          ml: 2,
        },
      }}
      onClick={handleLinkClick}
    >
      <Link underline="none" color={'black'}>
        {label}
      </Link>
    </Box>
  );
};

export default UnderlineLink;
