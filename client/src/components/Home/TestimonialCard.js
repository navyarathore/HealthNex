import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialCard = ({ name, role, image, rating, content }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        p: 3,
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <FormatQuoteIcon
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: 40,
          color: 'primary.light',
          opacity: 0.2,
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={image}
            alt={name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
        <Rating value={rating} readOnly sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard; 